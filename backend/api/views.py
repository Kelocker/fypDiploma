# from django.shortcuts import render
# from django.contrib.auth.models import User
# from rest_framework import generics
# from .serializers import UserSerializer
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from django.http import JsonResponse
# from .models import Exercise, Challenge, ChallengeSubmission
# from django.db.models import Case, When, Value, IntegerField


# # Create your views here.

# class CreatreUserView(generics.CreateAPIView):

#     # specify the queryset on what object to be looking for
#     queryset = User.objects.all()

#     # what kind of data we need to accpet
#     serializer_class = UserSerializer

#     #  who can call this
#     permission_classes = [AllowAny]


# def exercise_list(request):
#     # Get the difficulty level from the query parameters
#     difficulty = request.GET.get('difficulty')

#     # Define the sort order for each difficulty level
#     difficulty_sort_order = Case(
#         When(difficulty_level='B', then=Value(1)),
#         When(difficulty_level='I', then=Value(2)),
#         When(difficulty_level='A', then=Value(3)),
#         output_field=IntegerField(),
#     )

#     # Filter the queryset based on the difficulty if it's provided
#     if difficulty:
#         exercises = Exercise.objects.filter(difficulty_level=difficulty)
#     else:
#         exercises = Exercise.objects.all().annotate(sort_order=difficulty_sort_order).order_by('sort_order')

 
#     exercise_list = [{
#         'title': exercise.title,
#         'difficulty_level': exercise.get_difficulty_level_display(),  
#         'description': exercise.description,
#         'question': exercise.question,
#         'answer': exercise.answer
#     } for exercise in exercises]
#     return JsonResponse(exercise_list, safe=False)

# def challenge_list(request):
#     try:
#         challenges = Challenge.objects.all()
#         challenge_list = [{
#             'id': challenge.id,
#             'title': challenge.title,  
#             'description': challenge.description,
#             'question': challenge.question,
#             'start_time': challenge.start_time.isoformat(),
#             'end_time': challenge.end_time.isoformat(),
#         } for challenge in challenges]
#         return JsonResponse(challenge_list, safe=False)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)

# def challenge_results(request):
#     try:
#         submissions = ChallengeSubmission.objects.all()
#         results_list = [{
#             'id': submission.id,
#             'challenge_id': submission.challenge.id,
#             'user': submission.user.username,  # Assuming 'user' is a user instance
#             'rank': submission.rank,
#         } for submission in submissions]
#         return JsonResponse(results_list, safe=False)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)


# from django.http import JsonResponse
# from django.contrib.auth.decorators import login_required
# from .models import ChallengeSubmission, User

# @login_required
# def user_challenge_attempt_checker(request, username, challenge_id):
#     try:
#         user = User.objects.get(username=username)
#         submission_exists = ChallengeSubmission.objects.filter(
#             challenge_id=challenge_id,
#             user=user
#         ).exists()

#         return JsonResponse({
#             'username': username,
#             'challenge_id': challenge_id,
#             'has_attempted': submission_exists
#         })

#     except User.DoesNotExist:
#         return JsonResponse({'error': 'User does not exist'}, status=404)
#     except ChallengeSubmission.DoesNotExist:
#         return JsonResponse({'error': 'Challenge not found'}, status=404)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)




# from django.http import JsonResponse
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth import get_user_model

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_user_details(request):
#     user = request.user
#     if not user.is_authenticated:
#         print("Debug: User is not authenticated.")
#         return JsonResponse({'error': 'Unauthorized'}, status=401)

#     print("Debug: User is authenticated. Returning details.")
#     return JsonResponse({
#         'username': user.username,
#         'email': user.email,
#     })


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
        'title': exercise.title,
        'difficulty_level': exercise.get_difficulty_level_display(),
        'description': exercise.description,
        'question': exercise.question,
        'answer': exercise.answer
    } for exercise in exercises]
    return JsonResponse(exercise_list, safe=False)


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
