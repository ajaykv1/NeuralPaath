#from GoogleSearch import Search
from google_images_search import GoogleImagesSearch

def getPicInfo(media):

	output = GoogleImagesSearch(file_path="home/user/Pictures/image.jpg")
	# output = GoogleImagesSearch(url="https://telegra.ph/file/2018f3575ffa4ae93739b.jpg")
	print(output)

getPicInfo("./scratchPaper/Monalisa.png")