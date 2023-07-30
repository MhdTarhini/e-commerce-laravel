function productsDisplay(id, image, name, description, price, category) {
  return `<tr>
            <td>${id}</td>
            <td><img src=${image} alt="Product 1"></td>
            <td>${name}</td>
            <td>${description}</td>
            <td>${price}$</td>
            <td>${category}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>`;
}
async function fetchData() {
    try{
        const response = await axios.get("")
    }
}
