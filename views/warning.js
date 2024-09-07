<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Peringatan Stok</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <header>
    <h1>Peringatan Stok</h1>
  </header>
  <main>
    <table>
      <thead>
        <tr>
          <th>Nama Produk</th>
          <th>Stok</th>
        </tr>
      </thead>
      <tbody>
        <% products.forEach(product => { %>
          <tr>
            <td><%= product.name %></td>
            <td><%= product.stock %></td>
          </tr>
        <% }) %>
      </tbody>
    </table>
  </main>
</body>
</html>
