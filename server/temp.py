labels={'Apple-Apple scab': 0,'Apple-Black rot': 1,'Apple-Cedar apple rust': 2,'Apple-Healthy': 3,'Blueberry-Healthy': 4,'Cherry-Powdery_mildew': 5,'Cherry-Healthy': 6,
                        'Corn-Cercospora leaf spot': 7,
                        'Corn-Common_rust_': 8,
                        'Corn-Northern Leaf Blight': 9,'Corn-healthy': 10,'Cucumber-Beetles': 11,'Cucumber-Healthy': 12,'Grape-Black rot': 13,'Grape-Esca': 14,'Grape-Leaf blight': 15,'Grape-Healthy': 16,
                        'Mango-GallMidge': 17,
                        'Mango-Healthy': 18,
                        'Orange-Haunglongbing': 19,
                        'Peach-Bacterial spot': 20,
                        'Peach-Healthy': 21,
                        'Pepperbell-Bacterial_spot': 22,
                        'Pepperbell-Healthy': 23,
                        'Potato-Early blight': 24,
                        'Potato-Late blight': 25,
                        'Potato-Healthy': 26,
                        'Raspberry-Healthy': 27,
                        'Rice-Healthy': 28,
                        'Soybean-Healthy': 29,
                        'Squash-Powdery_mildew': 30,
                        'Strawberry-Leaf_scorch': 31,
                        'Strawberry-healthy': 32,
                        'Sugarcane-RedRot': 33,
                        'Sugarcane-Redrust': 34,
                        'Tomato-Bacterial_spot': 35,
                        'Tomato-Early blight': 36,
                        'Tomato-Late blight': 37,
                        'Tomato-Leaf Mold': 38,
                        'Tomato-Septoria leaf spot': 39,
                        'Tomato-Spider mites': 40,
                        'Tomato-Target Spot': 41,
                        'Tomato-Yellow Leaf Curl Virus': 42,
                        'Tomato-mosaic virus': 43,
                        'Tomato-Healthy': 44}

def getData(result):
    data=list(labels.keys())[list(labels.values()).index(result)]
    data=str(data).split('-')
    return data

if __name__=="__main__":
    print(getData(0))
