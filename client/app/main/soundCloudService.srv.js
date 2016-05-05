angular
  .module('anatApp')
  .factory('SoundCloudService', function SoundCloudService($window, $q, $http){
    var url = '/tracks',
      itemPerPage = 6,
      clientId = 'd652006c469530a4a7d6184b18e16c81',
      nextLink;
    return {
      play: (trackId) => {
        $window.SC.stream(url+'/'+trackId).then((player) => {
          player.play();
        });
      },

      loadNext: () => {
        var defer = $q.defer();
        if(nextLink){
          $http.get(nextLink).then((response) => {
            defer.resolve(response.data.collection);
            nextLink = response.data.next_href;
          });
        }
        return defer.promise;
      },

      get: (term) => {
        var defer = $q.defer();
        nextLink = null;
        $window.SC.get('/tracks', {
          q: term, limit: itemPerPage, linked_partitioning: 1
        }).then((tracks) => {
          defer.resolve(tracks.collection);
          nextLink = tracks.next_href;
        });
        return defer.promise;
      },

      init: () => {
        $window.SC.initialize({client_id: clientId});
      }

    };
  });
