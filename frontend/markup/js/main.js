'use strict';

(function () {
  var selects = document.querySelectorAll('.js-multiple-select');
  for (var i = 0; i < selects.length; i++) {
    var placeholder = selects[i].getAttribute('data-label');
    var SS = new Selectr(selects[i], {
      searchable: false,
      multiple: true,
      width: 222,
      placeholder: placeholder
    });
    var selection = Selectr.prototype.select,
      deselection = Selectr.prototype.deselect;
    var ours = document.createElement('div');
    ours.className = SS.selected.className;
    SS.selected.className += ' selectr-selected--hidden';
    SS.selected.parentNode.insertBefore(ours,SS.selected);
    var updateOurs = function(){
      ours.innerText = SS.selected.innerText.trim().replace(/\n/g, ', ') || placeholder;
    };
    Selectr.prototype.select = function(){
      selection.apply(this, arguments);
      updateOurs();
    };

    Selectr.prototype.deselect = function(){
      deselection.apply(this, arguments);
      updateOurs();
    };
    updateOurs();
  }
})();
