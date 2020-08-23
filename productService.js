
async function loadProduct(){
    let response = await fetch('http://localhost:3000/products');
    if (response.ok) { 
        let products = await response.json();
        productContainer.innerHTML = '';
        products.forEach(product => 
            productContainer.appendChild(parseProduct(product)));
    } else {
        alert("HTTP GET Request Error: " + response.status);
    }
};

function parseProduct(product){
    const currentUrl = window.location.href.split('?')[0];
    const productCol = document.createElement('div');
    productCol.className = 'col-sm-3';
    productCol.innerHTML = 
        `<div class='card m-2'>
            <img class='card-img-top' src='noImage.png'>
            <div class='card-body text-left'>
                <h5 class='card-title'>${product.productName}</h5>
                <p class='card-text small'>${product.productDescription}</p> 
                <p class='card-text text-black-50 small'>${product.productPrice}</p>
            </div>
            <div class='card-footer text-center'>
                <div class='row'>
                    <div class='col-6 p-0'>
                        <a class='text-black-50 btn btn-link btn-sm' href='${currentUrl}?id=${product.id}'><i class="fa fa-edit"></i> Edit</a>
                    </div>
                    <div class='col-6 p-0'>
                        <span class='text-black-50 btn btn-link btn-sm' onClick='deleteProduct(${product.id})'><i class="fa fa-trash"></i> Delete</span>
                    </div>
                </div>
            </div>
        </div>`;
    return productCol;
}

async function saveProduct(productForm){
    let response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(productForm)))
      });
      if(response.ok){
          loadProduct();
          alert('Product has been added successfully!');
          openModal(false);
      } else {
          alert("HTTP-Error: " + response.status);
      }
}

async function deleteProduct(id){
    let response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
      });
      if(response.ok){
          loadProduct();
          alert('Product has been deleted successfully!');
      } else {
          alert("HTTP-Error: " + response.status);
      }
}

async function getProduct(id){
    let response = await fetch( `http://localhost:3000/products/${id}`);
    if (response.ok) { 
       return await response.json();
    } else {
        alert("HTTP-Error: " + response.status);
        return null;
    }
};

async function updateProduct(id, productForm){
    let response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(productForm)))
      });
      if(response.ok){
          alert('Product has been updated successfully!');
          loadProduct();
          window.location.href = window.location.href.split('?')[0];
      } else {
          alert("HTTP-Error: " + response.status);
      }
}

function openModal(modalSwitch){
    if(modalSwitch) 
        openProductModal.click();
    else
        closeProductModal.click();
}
