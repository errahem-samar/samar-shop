import pandas as pd
import numpy as np
import pickle
from PIL import Image
import io
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
import tensorflow as tf
from sklearn.neighbors import KNeighborsClassifier

# required files: X.pkl, trained_model.csv  same directory


# load data
data_df = pd.read_csv('trained_model.csv', on_bad_lines='skip')
# y = data_df['id']'

# load X
with open('X.pkl', 'rb') as file:
    X = pickle.load(file)

# load nearest_neighbours
with open('knn_model.pkl', 'rb') as file:
    nearest_neighbours = pickle.load(file)

# load embeddings
embeddings = tf.keras.models.load_model('saved_embedding_model.h5')

data_df = data_df.reset_index(drop=True)

# image_file = request.files['image']
# image = Image.open(io.BytesIO(image_file.read()))
# similar_images = find_similar_images(image)

# id = 1
# img1 = read_img(data_df.loc[id,'image']) # should be updated later to accept input image
# dist, index = nearest_neighbours.kneighbors(X=X[id,:].reshape(1,-1)) # index -> ids of similar images
# print(index)