angular
  .module('anatApp')
  .factory('SearchHistoryService', function SearchHistoryService($window){
    var _storage = [],
      MAX_ITEMS = 5,
      LOCALSTORAGE_KEY = 'SearchHistoryService';
    return {

      getAll: () => {
        return _storage;
      },

      get: (term) => {
        return _storage.filter((val) => {
          return val == term;
        });
      },

      set: (term) => {
        var indexOfTerm = _storage.indexOf(term);
        if(indexOfTerm != -1){
          _storage.splice(indexOfTerm, 1);
        }
        if(_storage.length == MAX_ITEMS){
          _storage.splice(_storage.length - 1, 1);
        }
        _storage.unshift(term);
      },

      save: () => {
        $window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(_storage));
      },

      init: () => {
        var dataFromLocalStorage = $window.localStorage.getItem(LOCALSTORAGE_KEY);
        if(dataFromLocalStorage){
          dataFromLocalStorage = JSON.parse(dataFromLocalStorage);
        }
        _storage = dataFromLocalStorage || _storage;

      }
    };
  });
