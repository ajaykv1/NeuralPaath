import whisper
import torch 
import os
from pytube import YouTube
from moviepy.editor import *

def contentToComprhension(media, mType):

    useMp3 = ""

    if mType == 'URL':
        destination = "./ScratchPaper"
        video = YouTube(video_link)
        audio = video.streams.filter(only_audio=True).first()
        audio.download(output_path = destination, filename = "Workspace.mp4")
        
        print('Got The Video!')

        mp4_file = "./ScratchPaper/Workspace.mp4"
        mp3_file = "./ScratchPaper/Workspace.mp3"

        FILETOCONVERT = AudioFileClip(mp4_file)
        FILETOCONVERT.write_audiofile(mp3_file)
        FILETOCONVERT.close()

        os.remove("./ScratchPaper/Workspace.mp4")
        useMp3 = "./ScratchPaper/Workspace.mp3"
        print('Got The Audio!')

    if mType == 'MP4':

        mp4_file = media
        mp3_file = "./ScratchPaper/Workspace.mp3"

        FILETOCONVERT = AudioFileClip(mp4_file)
        FILETOCONVERT.write_audiofile(mp3_file)
        FILETOCONVERT.close()

        useMp3 = "./ScratchPaper/Workspace.mp3"
        print('Got The Audio!')

    if mType == 'MP3':
        useMp3 = media
        print('Got The Audio!')



    model = whisper.load_model("base")
    result = model.transcribe(useMp3)

    os.remove("./ScratchPaper/Workspace.mp3")

    transcribedText = result["text"]
    print(transcribedText)

    


video_link = "https://www.youtube.com/watch?v=P4dM8dUtEys&ab_channel=SportsShowNation"
contentToComprhension(video_link, "URL")










