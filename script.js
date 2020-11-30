
window.addEventListener("load", function() {
  // This kicks it off
  initCapture();
});

function initCapture() {
  console.log("initCapture");

  let audio = document.getElementById("myaudio");
  let constraints = { audio: true, video: false };

  // Prompt the user for permission, get the stream
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {

        var ac = new AudioContext();
        var audioSource = ac.createMediaStreamSource(stream);

        /* Using Tone.js */
        Tone.setContext(ac);

        var reverb = new Tone.Reverb({ decay: 10, wet: 0.5 });

        Tone.connect(audioSource, reverb);
        Tone.connect(reverb, Tone.getContext().destination);
        
    })
    .catch(function(err) {
      /* Handle the error */
      alert(err);
    });
}
