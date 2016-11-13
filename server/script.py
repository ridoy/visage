#!/usr/bin/env python

""" First attempt at OpenCV work in Python"""
import cv2
import sys
import numpy
import pprint
import random
import math

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def create_and_train_model_from_dict(label_matrix):
    """ Create eigenface model from dict of labels and images """
    model = cv2.createEigenFaceRecognizer()
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
    im = cv2.imread(filename, cv2.CV_LOAD_IMAGE_GRAYSCALE)
    im_resized = cv2.resize(im, (100, 100))
    return im_resized

if __name__ == "__main__":
    training_data = prepare_training_testing_data(read_csv())
    data_dict = create_label_matrix_dict(training_data)
    model = create_and_train_model_from_dict(data_dict)

    filename = sys.argv[1]
    im = cv2.imread(filename, cv2.CV_LOAD_IMAGE_GRAYSCALE)
    faces = face_cascade.detectMultiScale(im, 1.3, 5)
    if len(faces) == 0:
        print 0
    else:
        (x,y,w,h) = faces[0] # assuming this is the biggest face
        roi = im[y:y+h, x:x+w] # crop out face
        roi_resized = cv2.resize(roi, (100, 100))
        predicted_label = predict_image_from_model(model, roi_resized)
        '''
        cv2.imshow('img', roi_resized)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        '''
        print predicted_label[0]
