import styles from '../styles/qrcode-create.module.css';

export default function Download({image}) {

  const downloadFile = async () => {
    let binaryString = window.atob(image);
    let length = binaryString.length;
    let bytes = new Uint8Array(length);

    for (var i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const url = window.URL.createObjectURL(
      new Blob([bytes.buffer, {type: 'image/png'}]),
    );

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `image.png`,
    );

    // Start download
    link.click();
  };

  return (
    <a className={styles.longButton} onClick={downloadFile}>
      <span className={styles.buttonText}>Download (.png)</span>
    </a>
  )
}
