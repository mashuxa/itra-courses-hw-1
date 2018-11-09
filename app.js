document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let objectProps;
  const objectWrapper = document.querySelector('.source-container');

  function render(props) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(props.borderRadius, 0);
    ctx.lineTo(props.width - props.borderRadius, 0);
    ctx.arcTo(props.width, 0, props.width, props.borderRadius, props.borderDeg);
    ctx.lineTo(props.width, props.height - props.borderRadius);
    ctx.arcTo(props.width, props.height, props.width - props.borderRadius, props.height, props.borderDeg);
    ctx.lineTo(props.borderRadius, props.height);
    ctx.arcTo(0, props.height, 0, props.height - props.borderRadius, props.borderDeg);
    ctx.lineTo(0, props.borderRadius);
    ctx.arcTo(0, 0, props.borderRadius, 0, props.borderDeg);
    ctx.fillStyle = props.fillColor;
    ctx.fill();
    ctx.closePath();
  }

  function setWrapperSize() {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;

    //When size is changed, canvas should be rendered
    if (objectProps !== undefined) {
      render(objectProps);
    }
  }

  function moveObject() {
    console.log('moving');
  }


  objectWrapper.addEventListener('mousedown', (e) => {
      const targetObject = e.target;
      targetObject.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
      if (targetObject.classList.contains('source-container__object')) {
        objectProps = {
          x0: targetObject.offsetLeft,
          y0: targetObject.offsetTop,
          width: targetObject.offsetWidth,
          height: targetObject.offsetHeight,
          borderRadius: parseInt(window.getComputedStyle(targetObject).getPropertyValue('border-radius')),
          borderDeg: 50,
          fillColor: window.getComputedStyle(targetObject).getPropertyValue('background-color'),
        };
        document.addEventListener('mousemove', moveObject);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moveObject);
          },
        );
      }
    },
  );


  setWrapperSize();
  window.addEventListener('resize', setWrapperSize);
});
