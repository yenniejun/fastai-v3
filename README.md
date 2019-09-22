# SPAM or NOT SPAM?
This is an image classifier to detect whether or not an image is or contains spam. The classifier was built using a [fast.ai](https://www.fast.ai) Resnet32 Convolutional Neural Network model. It is a very basic image classifier built for the first project for the FastAi Deep Learning course.

I forked my project from [fast.ai](https://github.com/fastai/fastai)'s repository. You can check out their sample project [here](https://fastai-v3.onrender.com).

You can test your changes locally by installing Docker and using the following command:

```
docker build -t fastai-v3 . && docker run --rm -it -p 5000:5000 fastai-v3
```

My model was hosted using [Render](https://render.com). 
The guide for production deployment to Render is at https://course.fast.ai/deployment_render.html.


# My Project

## Training Set
I used the first 130 or so images of "spam" on Google images for my dataset of "spam" images. For my dataset of "not spam" images, I compiled a random dataset of images including produce, humans, computers, and nature.

## Model Improvements
The model still has some issues with classifying images, and this is partly because I need to clean up the dataset a bit. When you image search "spam", you get a lot of results of cooked food that includes spam but isn't apparent that it is spam. I need to remove those to make the classifier a little clearer.

## Code Improvements
- Make mobile-friendly (accessibility, image uploading, "try again" button coloring)
- Allow uploading photos via camera
