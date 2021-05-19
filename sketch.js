//参考文献: FaceApi_Video_Landmarks 'https://editor.p5js.org/ml5/sketches/FaceApi_Video_Landmarks'
//画像引用元: 
//新垣結衣＆星野源が結婚発表！「逃げ恥」が現実に「支え合いながら豊かな時間を」 'https://article.auone.jp/detail/1/5/9/8_9_r_20210519_1621408231798507'

let faceapi;
let video;
let genImg;
let detections;
let faceX, faceY, faceWidth, faceHeight;

const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

function preload() {
    genImg = loadImage("./images/gen.jpeg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(360, 270);
    video.hide();
    faceapi = ml5.faceApi(video, detection_options, modelReady)
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }

    detections = result;
    image(video, 0, 0)
    if (detections) {
        if (detections.length > 0) {
            getLandmarks(detections)
        }

    }

    let c = get(faceX,faceY,faceWidth,faceHeight);

    push();
    scale(windowWidth / genImg.width);
    image(genImg, 0, 0);
    image(c, 104, 144, 120, 120);
    pop();
    faceapi.detect(gotResults);
}



function getLandmarks(detections) {

    if (detections.length < 0) return;

    const rightEyeBrow = detections[0].parts.rightEyeBrow;
    const leftEyeBrow = detections[0].parts.leftEyeBrow;

    faceX = leftEyeBrow[0].x;
    faceY = leftEyeBrow[0].y;
    faceWidth = rightEyeBrow[rightEyeBrow.length - 1].x - faceX;
    faceHeight = faceWidth;

    console.log(faceX,faceY,faceWidth,faceHeight);


}