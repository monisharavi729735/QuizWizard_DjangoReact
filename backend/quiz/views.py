from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Quiz
import json
import google.generativeai as genai # type: ignore
from decouple import config

# Configure the API key for Google Generative AI
genai.configure(api_key=config('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash',
                              generation_config={"response_mime_type": "application/json"})


#login_required(login_url='rest_login')
@csrf_exempt
def create_quiz(request):
    if request.method == 'POST':
        try:
            # Get user input from request data
            data = json.loads(request.body)

            # Extract fields from JSON data
            title = data.get('title', 'Default Title')
            prompt = data.get('prompt', 'Default Description')
            difficulty = data.get('difficulty', 'Easy')
            num_questions = data.get('numQuestions', 2)
            user_id = data.get('userId')
            
            # Debugging: Print user info
            print("Authenticated User:", request.user)
            print("User ID:", request.user.id)
            print("Is Authenticated:", request.user.is_authenticated)

            # If not authenticated, print a warning
            if not request.user.is_authenticated:
                print("User is not authenticated")

            # Generate quiz content using Gemini API
            prompt_text = f"Write a quiz about {prompt} with {num_questions} questions. The difficulty level should be {difficulty}. The response needs to be in JSON format."
            prompt_text = (
                f"Write a quiz about {prompt} with {num_questions} questions. The difficulty level should be {difficulty}. "
                "The response should be in JSON format with each question containing the fields: 'question', 'options', "
                "'answer', and 'explanation'. Here is the JSON structure to follow:\n"
                "{\n"
                "    'quiz': {\n"
                "        'title': 'Topic Title',\n"
                "        'description': 'Brief description of the topic.',\n"
                "        'questions': [\n"
                "            {\n"
                "                'question': 'Question text here',\n"
                "                'options': [\n"
                "                    'Option 1',\n"
                "                    'Option 2',\n"
                "                    'Option 3',\n"
                "                    'Option 4'\n"
                "                ],\n"
                "                'answer': 'Correct Option Text',\n"
                "                'explanation': 'Explanation of why this answer is correct.'\n"
                "            },\n"
                "            {\n"
                "                'question': 'Another question text here',\n"
                "                'options': [\n"
                "                    'Option 1',\n"
                "                    'Option 2',\n"
                "                    'Option 3',\n"
                "                    'Option 4'\n"
                "                ],\n"
                "                'answer': 'Correct Option Text',\n"
                "                'explanation': 'Explanation of why this answer is correct.'\n"
                "            }\n"
                "        ]\n"
                "    }\n"
                "}\n"
            )
            response = model.generate_content(prompt_text)

            try:
                # Directly retrieve the content, assuming response is a single text block
                quiz_content = response.text

                # Remove backticks if present
                if quiz_content.startswith("```json"):
                    quiz_content = quiz_content[7:]
                if quiz_content.endswith("```"):
                    quiz_content = quiz_content[:-3]

                # Parse the cleaned JSON content
                parsed_content = json.loads(quiz_content)
                print(parsed_content)

            except (AttributeError, json.JSONDecodeError) as e:
                # Handle JSON structure or parsing errors
                print("Error processing quiz content:", e)
                return JsonResponse({'error': 'Invalid JSON format in quiz content.'}, status=400)

            user = request.user if request.user.is_authenticated else None
            print(user)
            
            # Save quiz data to the database
            quiz = Quiz.objects.create(
                user=user,
                title=title,
                description=prompt,
                difficulty=difficulty,
                num_questions=num_questions,
                quiz_content=parsed_content,
                creator_id=user_id,
            )

            return JsonResponse({
                'quiz_id': quiz.id,
                'quiz_content': parsed_content,
                'title': title,
                'difficulty': difficulty,
                'num_questions': num_questions,
                'user_id': quiz.creator_id
            })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON in request body.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

def quiz_list_view(request):
    quizzes = Quiz.objects.all()  # Fetch all quizzes
    quiz_data = [
        {
            "id": quiz.id,
            "user": quiz.user.username if quiz.user else None,
            "title": quiz.title,
            "description": quiz.description,
            "difficulty": quiz.difficulty,
            "num_questions": quiz.num_questions,
            "quiz_content": quiz.quiz_content,
            "date_created": quiz.date_created.strftime('%Y-%m-%d %H:%M:%S'),
            "creator_id": quiz.creator_id,
        }
        for quiz in quizzes
    ]
    return JsonResponse(quiz_data, safe=False)
