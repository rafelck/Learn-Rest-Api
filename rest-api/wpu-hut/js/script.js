function showAllMenu(){
    $.getJSON('data/pizza.json', function(data) {
        let menu = data.menu;
        $.each(menu, function (i, data) {
            $('#daftar-menu').append(' <div class="col-md-4"><div class="card mb-3"><img src="img/menu/'+ data.gambar +'" class="card-img-top"><div class="card-body"> <h5 class="card-title">'+ data.nama +'</h5><p class="card-text">'+ data.deskripsi +'</p><h5 class="card-title">Rp. '+ data.harga +'</h5> <a href="#" class="btn btn-primary">Buy It!</a></div></div></div>'); //fungsi untuk menempelkan html melalui javascript
        })
    });
}

showAllMenu();
//funcion di bawah ini untuk menyalkan active dan non active pada navbar
$('.nav-link').on('click', function () { //mencari class css yang di inginkan
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    let kategori = $(this).html();
    $('h1').html(kategori);

    if(kategori == 'All-Menu'){
        showAllMenu();
        return;    
    }
        
    


    $.getJSON('data/pizza.json', function(data) {
        let menu = data.menu;
        let content = '';

        $.each(menu, function (i, data) {
            if(data.kategori == kategori.toLowerCase()){
                content += '<div class="col-md-4"><div class="card mb-3"><img src="img/menu/'+ data.gambar +'" class="card-img-top"><div class="card-body"> <h5 class="card-title">'+ data.nama +'</h5><p class="card-text">'+ data.deskripsi +'</p><h5 class="card-title">Rp. '+ data.harga +'</h5> <a href="#" class="btn btn-primary">Buy It!</a></div></div></div>';
            }else{
                //showAllMenu();
            }
        });
        $('#daftar-menu').html(content);   
    });
    
   
});