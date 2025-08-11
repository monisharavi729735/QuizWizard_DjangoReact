from decouple import config
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-(zi*=kro^qhy79e89^)neq)j9g^bxqfzg0xcq0doy#3&06%mo6'

DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    "dj_rest_auth",
    "dj_rest_auth.registration",
    'corsheaders',
    'quiz',
    'users',
]

# Custom user model
AUTH_USER_MODEL = 'users.CustomUser' 

# REST Framework Authentication Settings
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",  # Ensures authentication is required
    ],
}

# Django Allauth settings
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_USER_MODEL_USERNAME_FIELD = None  # Important for allauth
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False  # Since we’re not using username
LOGIN_FIELD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'none'  # Or 'mandatory' for email verification

# Configure login and logout
LOGIN_URL = '/api/auth/login/'

# CORS configuration for frontend (React)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Frontend URL
]
CORS_ALLOW_CREDENTIALS = True  # Important for sending cookies with requests

# Middleware configuration
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Required for session
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # This must be here
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

# Session Configuration
SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Default session storage
SESSION_COOKIE_SECURE = False  # Change to True in production with HTTPS
SESSION_COOKIE_HTTPONLY = True  # Helps to prevent JavaScript access to the session cookie
SESSION_COOKIE_SAMESITE = 'Lax'  # 'Strict' for higher security

# Site ID for allauth
SITE_ID = 1

# Root URL config
ROOT_URLCONF = 'backend.urls'

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files configuration
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                #'django.contrib.sites.context_processors.sites',
            ],
        },
    },
]

CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']
CSRF_COOKIE_NAME = "csrftoken"
