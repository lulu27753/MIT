function addEventHandle (target, type, fn) {
  if (target.addEventListener) {
    target.addEventListener(type, fn);
  } else {
    target.attachEvent('on' + type, fn);
  }
}

function removeEventHandle (target, type, fn) {
  if (target.addEventListener) {
    target.removeEventListener(type, fn);
  } else {
    target.detachEvent('on' + type, fn);
  }
}

export { addEventHandle, removeEventHandle };
