export default function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        return reader.result
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
        return error
    };
}
/*//Function that returns a promise to read the file
      const reader = (file) => {
        return new Promise((resolve) => {
          const fileReader = new FileReader();
          fileReader.onload = () => resolve(fileReader.result);
          fileReader.readAsDataURL(file);
        });
      }
      const readFile = (file) => {
        reader(file).then(result => {
          // eslint-disable-next-line vue/no-mutating-props
          props.trackData.previewPicture.value = result
          console.log(props.trackData.previewPicture.value)
        })}*/
