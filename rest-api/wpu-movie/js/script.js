function searchMovie(){
    $('#movie-list').html(''); //mengosongkan list

    $.ajax({
        url: 'http://omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '23d440b3', //key yang sudah di dapat
            's' : $('#cari-input').val()
        },
        success: function (result) {
            if(result.Response == "True"){
                let movies = result.Search; //.Search di ambil dari data json yang dapat dilihat pada postman.
                $.each(movies, function (i , data) {
                  $('#movie-list').append(`
                <div class="col-md-4">
                <div class="card mt-3">
                <img src="`+ data.Poster +`" class="card-img-top" alt="`+ data.Title +`">
                  <div class="card-body">
                    <h5 class="card-title">`+ data.Title +`</h5>
                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
                  </div>
                </div>
                </div>
                  `);  
                });

                $('#cari-input').val(''); //mengosongkan value setelah result tampil

            } else{
                $('#movie-list').html(`
                <div class="col">
                <h1 class="text-center">`+result.Error+`</h1> 
                </div>
                `)//.Error di ambil dari data json yang dapat dilihat pada postman.
            }
        }
    });
}

$('#button-cari').on('click', function(){
    searchMovie();
});

$('#cari-input').on('keyup', function(e){
    if(e.keyCode === 13){
        searchMovie();
    }
});

$('#movie-list').on('click','.see-detail', function(){
    //console.log($(this).data('id')); //untuk mengambil data-id
    $.ajax({
        url: 'http://omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '23d440b3', //key yang sudah di dapat
            'i' : $(this).data('id')
        },
        success: function (movie) {
            if( movie.Response === "True"){
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                    <div class="col-md-4">
                    <img src ="` + movie.Poster + `" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                    <ul class="list-group">
                        <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                        <li class="list-group-item">`+ movie.Released +`</li>
                        <li class="list-group-item">`+ movie.Runtime +`</li>
                        <li class="list-group-item">`+ movie.Genre +`</li>
                        <li class="list-group-item"><p>`+ movie.Plot +`</p></li>
                        <li class="list-group-item">Actors: `+ movie.Actors +`</li>
                        <li class="list-group-item">Director: `+ movie.Director +`</li>
                        <li class="list-group-item">Writer: `+ movie.Writer +`</li>
                    </ul>
                    </div>
                    </div>
                </div>    
                `);
            }
        }

    });

});

