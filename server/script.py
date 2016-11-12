#!/usr/bin/env python

""" First attempt at OpenCV work in Python"""
import cv2
import numpy
import pprint
import random
import math

from sklearn import cross_validation as cval
from sklearn.base import BaseEstimator
from sklearn.metrics import precision_score

def create_and_train_model_from_dict(label_matrix):
    """ Create eigenface model from dict of labels and images """
    model = cv2.createFisherFaceRecognizer()
    model.train(label_matrix.values(), numpy.array(label_matrix.keys()))

    return model

def predict_image_from_model(model, image):
    """ Given an eigenface model, predict the label of an image"""
    return model.predict(image)

def read_csv(filename='faces.csv'):
    """ Read a csv file """
    csv = open(filename, 'r')
    return csv

def prepare_training_testing_data(file):
    """ prepare testing and training data from file"""
    lines = file.readlines()
    return lines
    '''
    training_data, testing_data = split_test_training_data(lines)
    return training_data, testing_data
    '''

def create_label_matrix_dict(input_file):
    """ Create dict of label -> matricies from file """
    ### for every line, if key exists, insert into dict, else append
    label_dict = {}

    for line in input_file:
        ## split on the ';' in the csv separating filename;label
        filename, label = line.strip().split(';')

        ##update the current key if it exists, else append to it
        if label_dict.has_key(int(label)):
            current_files = label_dict.get(label)
            numpy.append(current_files,read_matrix_from_file(filename))
        else:
            label_dict[int(label)] = read_matrix_from_file(filename)

    return label_dict

def split_test_training_data(data, ratio=0.2):
    """ Split a list of image files by ratio of training:test data """
    test_size = int(math.floor(ratio*len(data)))
    random.shuffle(data)
    return data[test_size:], data[:test_size]

def read_matrix_from_file(filename):
    """ read in grayscale version of image from file """
    return cv2.imread(filename, cv2.CV_LOAD_IMAGE_GRAYSCALE)

class FaceRecognizerModel(BaseEstimator):
    def __init__(self):
        self.model = cv2.createFisherFaceRecognizer()

    def fit(self, X, y):
        self.model.train(X, y)

    def predict(self, T):
        return [self.model.predict(T[i]) for i in range(0, T.shape[0])]

if __name__ == "__main__":
    training_data = prepare_training_testing_data(read_csv())
    data_dict = create_label_matrix_dict(training_data)
    model = create_and_train_model_from_dict(data_dict)

    filename = argv[1]
    predicted_label = predict_image_from_model(model, read_matrix_from_file(filename))
    print predicted_label, 'expecting 35'
