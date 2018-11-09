document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const objectWrapper = document.querySelector('.source-container');
  const objects = objectWrapper.querySelectorAll('.source-container__object');
  let objectProps;

  function render(props) {
    ctx.beginPath();
    ctx.moveTo(props.x0 + props.borderRadius, props.y0);

    ctx.lineTo(props.x0 + props.width - props.borderRadius, props.y0);
    ctx.arcTo(props.x0 + props.width, props.y0,
      props.x0 + props.width, props.y0 + props.borderRadius,
      props.borderDeg);

    ctx.lineTo(props.x0 + props.width, props.y0 + props.height - props.borderRadius);
    ctx.arcTo(props.x0 + props.width, props.y0 + props.height,
      props.x0 + props.width - props.borderRadius, props.y0 + props.height,
      props.borderDeg);

    ctx.lineTo(props.x0 + props.borderRadius, props.y0 + props.height);
    ctx.arcTo(props.x0, props.y0 + props.height,
      props.x0, props.y0 + props.height - props.borderRadius,
      props.borderDeg);

    ctx.lineTo(props.x0, props.y0 + props.borderRadius);
    ctx.arcTo(props.x0, props.y0,
      props.x0 + props.borderRadius, props.y0,
      props.borderDeg);

    ctx.fillStyle = props.fillColor;
    ctx.fill();
    ctx.closePath();
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function renderAll() {
    clear();
    objects.forEach((elem) => {
      objectProps = {
        x0: elem.offsetLeft,
        y0: elem.offsetTop,
        width: elem.offsetWidth,
        height: elem.offsetHeight,
        borderRadius: parseInt(window.getComputedStyle(elem).getPropertyValue('border-radius')),
        borderDeg: 50,
        fillColor: window.getComputedStyle(elem).getPropertyValue('background-color'),
      };
      render(objectProps);
    });
    console.log(objectProps.x0, objectProps.y0);
  }


  function moveObject(e) {
    if (e.target.classList.contains('source-container__object')) {
      e.target.style.left = `${e.target.offsetLeft + e.movementX}px`;
      e.target.style.top = `${e.target.offsetTop + e.movementY}px`;
      // objectProps.x0 = objectProps.x0 + e.movementX;
      // objectProps.y0 = objectProps.y0 + e.movementY;
    }
    renderAll();
  }

  objectWrapper.addEventListener('mousedown', (e) => {
      const targetObject = e.target;
      targetObject.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
      document.addEventListener('mousemove', moveObject);
      document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', moveObject);
        },
      );
    },
  );


  // *******
  function setWrapperSize() {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
    renderAll();
  }

  setWrapperSize();
  window.addEventListener('resize', setWrapperSize);
});
