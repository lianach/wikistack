const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">

    <div id="input-form">
      <form method="post" action="/posts">

      <label for="name">Author</label>
      <input type="text" name="name" />

        <label for="name">Title</label>
        <input type="text" name="title" />

        <label for="email">Email</label>
        <input type="text" name="email" />

        <label for="content">Content</label>
        <input type="text" name="content" />

        <label for="content">Status</label>
        <input type="text" name="status" />


    <div class="col-sm-offset-2 col-sm-10" id="subtmit-button">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

    </div>
  </form>
`);
