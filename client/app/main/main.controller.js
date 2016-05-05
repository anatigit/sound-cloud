'use strict';

(function() {

class MainController {

  constructor($http, SearchHistoryService, SoundCloudService) {
    this.$http = $http;
    SearchHistoryService.init();
    SoundCloudService.init();
    this.soundCloudService = SoundCloudService;
    this.searchHistoryService = SearchHistoryService;
    this.searchTerm = '';
    this.tracks = [];
    this.selectedTrack;
    this.errorMsg = 'no results were found...';
    this.isError = false;
    this.searchHistoryItems = SearchHistoryService.getAll();
  }

  play(trackId){
    this.soundCloudService.play(trackId);
  }

  setSelectedTrack(selectedTrack){
    this.selectedTrack = selectedTrack;
  }

  searchTracks(term) {
      this.soundCloudService
          .get(term)
          .then((tracks) => {
            this.searchHistoryService.set(term);
            this.searchHistoryService.save();
            this.tracks = tracks;
            if (this.tracks.length == 0){
              //dispaly "no results were found"
              this.isError = true;
            }
          });
  }

  nextTracks(){
    this.soundCloudService
          .loadNext()
          .then((tracks) => {
            this.tracks = tracks;
          });
  }


}
angular
  .module('anatApp')
  .controller('MainController', MainController)

})();
