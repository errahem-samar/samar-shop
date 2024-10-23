import numpy as np
import pandas as pd
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import re
import pickle
import tensorflow as tf
from tensorflow.keras.layers import Conv2D, MaxPooling2D, GlobalAveragePooling2D, Activation, Dropout, Flatten, Dense, Input, Layer
from tensorflow.keras.applications import VGG16
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.decomposition import PCA
import random
from sklearn.neighbors import KNeighborsClassifier

plt.rcParams['font.size'] = 16

data_df = pd.read_csv('./data.csv', on_bad_lines='skip')
# print(data_df.head())

data_df['image'] = data_df['id'].astype(str) + '.jpg'
# print(data_df.head())

path = './images'
image_files = os.listdir(path)
# print(image_files)

data_df['present'] = data_df['image'].apply(lambda x: x in image_files)
# print(data_df.head())

data_df = data_df[data_df['present']].reset_index(drop=True)
# print(data_df.head())

# train data, 112, test data 48
data_df = data_df.sample(112)
# print(data_df)

img_size = 224
datagen = ImageDataGenerator(rescale=1/255.)
generator = datagen.flow_from_dataframe(dataframe=data_df, directory=path, target_size=(img_size,img_size), x_col='image', \
                                       class_mode = None, batch_size=32, shuffle=False, classes=None)
# Found 112 validated image filenames.


# Defining Models
base_model = VGG16(include_top=False, input_shape=(img_size,img_size,3))

for layer in base_model.layers:
    layer.trainable = False

#base_model.trainable = False

input_layer = Input(shape=(img_size,img_size,3))
x = base_model(input_layer)
output = GlobalAveragePooling2D()(x)

embeddings = Model(inputs=input_layer, outputs=output)
# embeddings.summary()

# generator.reset()
def ensure_float32(generator):
    for batch in generator:
        yield (tf.convert_to_tensor(batch, dtype=tf.float32),)

float32_generator = ensure_float32(generator)

# step 112 / 32
X = embeddings.predict(float32_generator,steps=4 ,verbose=1)

# X : 112 rows * 512 columns
with open('X.pkl', 'wb') as file:
    pickle.dump(X, file)

embeddings.save('saved_embedding_model.h5')

pca = PCA(2)
X_pca = pca.fit_transform(X)

data_df[['pc1','pc2']] = X_pca

def read_img(image_path):
    image = load_img(os.path.join(path,image_path),target_size=(img_size,img_size,3))
    image = img_to_array(image)
    image = image/255.
    return image

y = data_df['id']

nearest_neighbours = KNeighborsClassifier(n_neighbors=7)
nearest_neighbours.fit(X,y)

with open('knn_model.pkl', 'wb') as file:
    pickle.dump(nearest_neighbours, file)

data_df = data_df.reset_index(drop=True)

for _ in range(1):
    i = random.randint(0,len(data_df))
    img1 = read_img(data_df.loc[i,'image'])
    dist, index = nearest_neighbours.kneighbors(X=X[i,:].reshape(1,-1))
    plt.figure(figsize = (4 , 4))
    plt.imshow(img1)
    plt.title("Input Image")
    plt.axis('off')
   
    plt.figure(figsize = (20 , 20))
    for i in range(1,6):
        plt.subplot(1 , 5, i)
        plt.subplots_adjust(hspace = 0.5 , wspace = 0.3)
        image = read_img(data_df.loc[index[0][i],'image'])
        plt.imshow(image)
        plt.title(f'Similar Product #{i}')
        plt.axis('off')
plt.show()

data_df.to_csv('trained_model.csv', index=False)