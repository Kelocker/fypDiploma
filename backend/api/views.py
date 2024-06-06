
import json
import subprocess
import os

from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from .models import Exercise, Challenge
from django.db.models import Case, When, Value, IntegerField
from rest_framework.views import APIView
from .models import Chapter, Lesson, Topic, Example
from .serializers import ChapterSerializer, LessonSerializer, TopicSerializer, ExampleSerializer, PasswordResetRequestSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.core.mail import send_mail, BadHeaderError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from datetime import datetime
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_decode
import logging
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Exercise, Challenge, ChallengeSubmission
from django.db.models import Case, When, Value, IntegerField
from rest_framework import generics
from django.contrib.auth.decorators import login_required
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny




class CreatreUserView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]




from django.contrib.auth.tokens import PasswordResetTokenGenerator
from datetime import datetime

class OneDayPasswordResetTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        login_timestamp = '' if user.last_login is None else user.last_login.replace(microsecond=0, tzinfo=None)
        return (
            str(user.pk) + user.password +
            str(login_timestamp) +
            str(timestamp) +
            str(datetime.now().day)
        )

token_generator = OneDayPasswordResetTokenGenerator()







   
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes
# from django.core.mail import send_mail, BadHeaderError
# from django.conf import settings
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from rest_framework.generics import GenericAPIView
# from django.contrib.auth.models import User
# from .serializers import PasswordResetRequestSerializer
# from .models import UsedToken
# from .tokens import token_generator
# import logging
# from datetime import datetime

# logger = logging.getLogger('myapp')

# class ForgetPasswordView(GenericAPIView):
#     serializer_class = PasswordResetRequestSerializer
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             email = serializer.validated_data['email']
#             try:
#                 user_email = User.objects.get(email=email)
#                 user_name = user_email.username
#                 uid = urlsafe_base64_encode(force_bytes(user_email.pk))
#                 token = token_generator.make_token(user_email)

#                 # Store the token in UsedToken model
#                 UsedToken.objects.create(user=user_email, token=token)

#                 password_reset_url = settings.PASSWORD_RESET_CONFIRM_URL.format(uid=uid, token=token)
#                 mail_subject = 'Reset your password'
#                 message = f'''Please click on the link to reset your password: {password_reset_url}, 
#                 In case you forgot your username, it is {user_name}. 
#                 If you did not request for password reset, please ignore this email.'''
#                 try:
#                     send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [user_email.email])
#                     return Response({'message': 'Password reset email has been sent.'}, status=status.HTTP_200_OK)
#                 except BadHeaderError:
#                     return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
#                 except Exception as e:
#                     return Response({'error': 'Failed to send reset email. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#             except User.DoesNotExist:
#                 return Response({'error': 'Email not registered'}, status=status.HTTP_404_NOT_FOUND)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.generics import GenericAPIView
from django.contrib.auth.models import User
from .serializers import PasswordResetRequestSerializer

class ForgetPasswordView(GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user_email = User.objects.get(email=email)
                user_name = user_email.username
                # Get UID
                uid = urlsafe_base64_encode(force_bytes(user_email.pk))
                # Generate token
                token = token_generator.make_token(user_email)

                # Construct password reset URL
                password_reset_url = settings.PASSWORD_RESET_CONFIRM_URL.format(uid=uid, token=token)

                mail_subject = 'Reset your password'
                message = f'''Please click on the link to reset your password: {password_reset_url}, 
                In case you forgot your username, it is {user_name}. 
                If you did not request for password reset, please ignore this email.'''
                try:
                    send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [user_email.email])
                    return Response({'message': 'Password reset email has been sent.'}, status=status.HTTP_200_OK)
                except BadHeaderError:
                    return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    return Response({'error': 'Failed to send reset email. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except User.DoesNotExist:
                return Response({'error': 'Email not registered'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class PasswordResetConfirmView(generics.GenericAPIView):
#     permission_classes = [AllowAny]

#     def post(self, request, uidb64, token):
#         logger.debug("Password reset request received.")
#         logger.debug(f"uidb64: {uidb64}, token: {token}")

#         try:
#             uid = urlsafe_base64_decode(uidb64).decode()
#             logger.debug(f"Decoded UID: {uid}")
#             user = User.objects.get(pk=uid)
#             logger.debug(f"User found: {user}")
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
#             logger.error(f"Error decoding UID or fetching user: {e}")
#             user = None

#         if user is not None and token_generator.check_token(user, token):
#             # Check if the token has been used
#             if UsedToken.objects.filter(user=user, token=token).exists():
#                 password = request.data.get('password')
#                 logger.debug(f"Password provided: {password}")
#                 if password:
#                     user.set_password(password)
#                     user.save()
#                     logger.debug("Password has been reset successfully.")
#                     # Delete the used token
#                     UsedToken.objects.filter(user=user, token=token).delete()
#                     return Response({'message': 'Password has been reset.'}, status=status.HTTP_200_OK)
#                 else:
#                     logger.error("Password not provided or invalid")
#                     return Response({'error': 'Password reset unsuccessful'}, status=status.HTTP_400_BAD_REQUEST)
#             else:
#                 logger.error("Token has already been used")
#                 return Response({'error': 'Token has already been used'}, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             logger.error("Invalid token or user not found")
#             return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

from django.utils.http import urlsafe_base64_decode
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import generics, status
from django.contrib.auth.models import User
import logging

logger = logging.getLogger('myapp')

class PasswordResetConfirmView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        logger.debug("Password reset request received.")
        logger.debug(f"uidb64: {uidb64}, token: {token}")

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            logger.debug(f"Decoded UID: {uid}")
            user = User.objects.get(pk=uid)
            logger.debug(f"User found: {user}")
        except (TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
            logger.error(f"Error decoding UID or fetching user: {e}")
            user = None

        if user is not None and token_generator.check_token(user, token):
            password = request.data.get('password')
            logger.debug(f"Password provided: {password}")
            if password:
                user.set_password(password)
                user.save()
                logger.debug("Password has been reset successfully.")
                return Response({'message': 'Password has been reset.'}, status=status.HTTP_200_OK)
            else:
                logger.error("Password not provided or invalid")
                return Response({'error': 'Password reset unsuccessful'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.error("Invalid token or user not found")
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)



class UpdateUserView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


    def put(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # def put(self, request, *args, **kwargs):
    #     user = self.get_object()
    #     serializer = self.get_serializer(user, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         print("Validation Errors:", serializer.errors)  # Add this line for debugging
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def exercise_list(request):
    difficulty = request.GET.get('difficulty')
    difficulty_sort_order = Case(
        When(difficulty_level='B', then=Value(1)),
        When(difficulty_level='I', then=Value(2)),
        When(difficulty_level='A', then=Value(3)),
        output_field=IntegerField(),
    )

    if difficulty:
        exercises = Exercise.objects.filter(difficulty_level=difficulty)
    else:
        exercises = Exercise.objects.all().annotate(sort_order=difficulty_sort_order).order_by('sort_order')

    exercise_list = [{
        'id': exercise.id,
        'title': exercise.title,
        'difficulty_level': exercise.get_difficulty_level_display(),
        'description': exercise.description,
        'question': exercise.question,
        'test_script': exercise.test_script,
    } for exercise in exercises]
    return JsonResponse(exercise_list, safe=False)







class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        chapters = Chapter.objects.all()
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data)

    def retrieve(self, request, chapterId=None):
        try:
            chapter = Chapter.objects.get(pk=chapterId)
            serializer = ChapterSerializer(chapter)
            return Response(serializer.data)
        except Chapter.DoesNotExist:
            return Response({'error': 'Chapter not found'}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request, *args, **kwargs):
        serializer = ChapterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LessonViewSet(APIView):
    permission_classes = [AllowAny]
    def get_queryset(self):
        chapter_id = self.kwargs['chapter_id']
        return Lesson.objects.filter(chapter_id=chapter_id)

    def get(self, request, *args, **kwargs):
        chapter_id = request.query_params.get('chapter_id', None)
        if chapter_id is not None:
            lessons = Lesson.objects.filter(chapter_id=chapter_id)
        else:
            lessons = Lesson.objects.all()
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TopicViewSet(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        print(f'Request: {request}')  # Log entire request object
        sublesson_id = request.query_params.get('sublesson', None)
        print(f'Received sublesson_id: {sublesson_id}')  # Debug statement

        if sublesson_id is not None:
            topics = Topic.objects.filter(sublesson_id=sublesson_id)
            print(f'Filtered topics: {topics}')  # Debug statement
        else:
            topics = Topic.objects.all()
            print(f'All topics: {topics}')  # Debug statement

        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExampleViewSet(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        examples = Example.objects.all()
        serializer = ExampleSerializer(examples, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ExampleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def execute_code(request, test_type, test_id):
    try:
        # Determine the type of test and fetch the appropriate model instance
        if test_type == 'exercise':
            test_instance = Exercise.objects.get(pk=test_id)
        elif test_type == 'challenge':
            test_instance = Challenge.objects.get(pk=test_id)
        else:
            return JsonResponse({'error': 'Invalid test type'}, status=400)

        folder_name = test_instance.test_script  # Use the folder name from the database
        data = json.loads(request.body)
        code = data.get('code')

        if code is None:
            return JsonResponse({'error': 'No code provided'}, status=400)

        exercise_file_path = f'test/{folder_name}/{folder_name}.py'
        
        # Write user code to file
        with open(exercise_file_path, 'w') as file:
            file.write(code)

        # Execute the test script using unittest
        original_dir = os.getcwd()
        os.chdir(f'test/{folder_name}')
        cmd = ['python', '-m', 'unittest', f'{folder_name}_test.py']
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        os.chdir(original_dir)
        return JsonResponse({'output': result.stdout, 'error': result.stderr, 'success': result.returncode == 0})
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exercise.DoesNotExist:
        return JsonResponse({'error': 'Exercise not found'}, status=404)
    except subprocess.TimeoutExpired:
        return JsonResponse({'error': 'Execution timed out', 'success': False})



def challenge_list(request):
    try:
        challenges = Challenge.objects.all()
        challenge_list = [{
            'id': challenge.id,
            'title': challenge.title,
            'description': challenge.description,
            'question': challenge.question,
            'start_time': challenge.start_time.isoformat(),
            'end_time': challenge.end_time.isoformat(),
        } for challenge in challenges]
        return JsonResponse(challenge_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def challenge_results(request):
    try:
        submissions = ChallengeSubmission.objects.all()
        results_list = [{
            'id': submission.id,
            'challenge_id': submission.challenge.id,
            'user': submission.user.username,
            'rank': submission.rank,
        } for submission in submissions]
        return JsonResponse(results_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import ChallengeSubmission, User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user
    return JsonResponse({
        'username': user.username,
        'email': user.email,
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_challenge_attempt_checker(request, username, challenge_id):
    try:
        user = User.objects.get(username=username)
        submission_exists = ChallengeSubmission.objects.filter(
            challenge_id=challenge_id,
            user=user
        ).exists()

        return JsonResponse({
            'username': username,
            'challenge_id': challenge_id,
            'has_attempted': submission_exists
        })

    except User.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except ChallengeSubmission.DoesNotExist:
        return JsonResponse({'error': 'Challenge not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import Challenge

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_challenge(request, id):
    try:
        challenge = Challenge.objects.get(id=id)
        return JsonResponse({
            'id': challenge.id,
            'title': challenge.title,
            'description': challenge.description,
            'question': challenge.question,
            'start_time': challenge.start_time.isoformat(),
            'end_time': challenge.end_time.isoformat(),
        })
    except Challenge.DoesNotExist:
        return JsonResponse({'error': 'Challenge not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

