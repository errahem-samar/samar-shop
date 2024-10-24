from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from products.models import Product
from products.serializers import ProductSerializer
from .serializers import ImageUploadSerializer 
from django.conf import settings

import pandas as pd
import numpy as np
import pickle
from PIL import Image
from pathlib import Path
import io
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
import tensorflow as tf
from sklearn.neighbors import KNeighborsClassifier

# Assuming you have a pre-trained model ready
# model = torch.load('path_to_pretrained_model.pth')  # Load your model here
# model.eval()

class SimilarProductsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        
        if serializer.is_valid():
            # Get the uploaded image
            image = serializer.validated_data['image']
            
            # img = Image.open(image)
            image = Image.open(io.BytesIO(image.read()))
            
            # Pass the image through the model
            # similar_products_ids = self.get_similar_products(img)
            # similar_products_ids = [1573, 1596]
            similar_products_ids = self.find_similar_images(image)
            # print(similar_products_ids)
            
            # Query the products based on the model's output
            similar_products = Product.objects.filter(id__in=similar_products_ids)
            # print(similar_products)
            
            # response_data = [{'id': product.id, 'name': product.name} for product in similar_products]
            # return Response(response_data, status=status.HTTP_200_OK)
            
            product_serializer = ProductSerializer(similar_products, many=True, context={'request': request})
            return Response(product_serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def process_image(self, image):
        # path = './images'
        img_size = 224
        image = image.resize((224, 224))  # Resize image to match model input size
        image_array = img_to_array(image)
        image_array = image_array / 255.  # Normalize
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
        return image_array
    

    def find_similar_images(self, input_image):
        path = Path(__file__).resolve().parent
        trained_model_data = os.path.join(path, 'trained_model.csv')
        data_df = pd.read_csv(trained_model_data, on_bad_lines='skip')

        knn_model = os.path.join(path, 'knn_model.pkl')
        with open(knn_model, 'rb') as file:
            nearest_neighbours = pickle.load(file)
        
        embeddings_path = os.path.join(path, 'saved_embedding_model.h5')
        embeddings = tf.keras.models.load_model(embeddings_path)

        new_image = self.process_image(input_image)
        new_image_embedding = embeddings.predict(new_image)

        # # Find similar images using KNN
        distances, indices = nearest_neighbours.kneighbors(new_image_embedding.reshape(1, -1))
        product_ids = data_df.iloc[indices[0]]['id'].values  # Adjust as necessary based on your DataFrame structure
        return product_ids
        return indices[0]
