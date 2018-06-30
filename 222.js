  function displayBanner(action) {
    if (action === 'close') {
      $target.removeClass(changeStatus).addClass(classes.opening).animate({
        bottom: (down),
      }, sec, function () {
        console.log('up completed');
        $btn.text(closetxt);
        $target.removeClass(changeStatus).addClass(classes.opened)
      }); //開 
    } else if (action === 'open') {
      $target.removeClass(changeStatus).addClass(classes.closing).animate({
        bottom: up,
      }, sec, function () {
        console.log('downompleted');
        $btn.text(opentxt);
        $target.removeClass(changeStatus).addClass(classes.closed)
      });
    } else {
      alert('404')
    }
  } //displayBanner;
