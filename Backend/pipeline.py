# -*- coding: utf-8 -*-
"""pipeline.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1jC_CvVTRJzEByQPr8ViV_dbiIxi2wt4O
"""

# !pip install happytransformer

import pickle
legendary_model = pickle.load(open("/content/drive/MyDrive/Grammar_correction/model.pkl", 'rb'))

from happytransformer import HappyTextToText, TTTrainArgs, TTSettings
beam_settings =  TTSettings(num_beams=5, min_length=1, max_length=20)
result = legendary_model.generate_text("I use php laravel as backend framework", args=beam_settings)
result

result = legendary_model.generate_text("I use php laravel as backnd framwork", args=beam_settings)

def correctGrammar(text):
  result = legendary_model.generate_text(text, args=beam_settings)
  return result

from textblob import TextBlob

def correctSpelling(text):
  a=text
  b=TextBlob(a)
  c=b.correct()
  return c.string

def containsNumber(string):
    units = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight","nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen","sixteen", "seventeen", "eighteen", "nineteen"]
    tens = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
    scales = ["hundred", "thousand", "million", "billion", "trillion"]
    if(string in units or string in tens or string in scales):
      return True
    return any(char.isdigit() for char in string)
def textContainsNumber(text):
  return any(containsNumber(word) for word in text.split(" "))

def pipeline(text):
  cont_num = textContainsNumber(text)
  text = correctSpelling(text)
  text = correctGrammar(text).text
  
  return text, cont_num

pipeline("I does my homework five time a day ")

