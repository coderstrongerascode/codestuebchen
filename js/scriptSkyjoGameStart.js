const signalingTextarea = document.getElementById('signalingData');
const createOfferBtn = document.getElementById('createOffer');
const joinGameBtn = document.getElementById('joinGame');
const sendSignalingDataBtn = document.getElementById('sendSignalingData');

let peerConnection;
let dataChannel;

// WebRTC-Konfiguration
const config = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }], // STUN-Server für NAT-Traversal
};

// Verbindung erstellen
function createPeerConnection() {
  peerConnection = new RTCPeerConnection(config);

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      signalingTextarea.value = JSON.stringify(event.candidate);
    }
  };

  peerConnection.ondatachannel = (event) => {
    const channel = event.channel;
    channel.onopen = () => console.log('Datenkanal geöffnet!');
    channel.onmessage = (e) => console.log('Nachricht erhalten:', e.data);
  };
}

// Spiel erstellen
createOfferBtn.addEventListener('click', async () => {
  createPeerConnection();
  dataChannel = peerConnection.createDataChannel('gameChannel');

  dataChannel.onopen = () => console.log('Datenkanal geöffnet!');
  dataChannel.onmessage = (e) => console.log('Nachricht erhalten:', e.data);

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  signalingTextarea.value = JSON.stringify(offer);
  console.log('Angebot erstellt:', offer);
});

// Spiel beitreten
joinGameBtn.addEventListener('click', async () => {
  createPeerConnection();

  const offer = JSON.parse(signalingTextarea.value);
  await peerConnection.setRemoteDescription(offer);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  signalingTextarea.value = JSON.stringify(answer);
  console.log('Antwort erstellt:', answer);
});

// Signalisierungsdaten senden
sendSignalingDataBtn.addEventListener('click', async () => {
  const candidate = JSON.parse(signalingTextarea.value);
  await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  console.log('ICE-Kandidat hinzugefügt:', candidate);
});
