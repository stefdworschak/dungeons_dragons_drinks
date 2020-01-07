from django.shortcuts import render

# Create your views here.
def create_dice(request):

    return render(request, 'dice.html')

def create_dice2(request):
    
    return render(request, 'dice_test.html')

def create_dice_new(request):
    
    return render(request, 'dice_new.html')