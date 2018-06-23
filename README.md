## jQuery Inline Edit Plugin


A small javascript library built on top of jQuery that allows you to easily do inline text editing using a text input, select, or textarea.

---

### Usage

Load the plugin

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.31/jquery.min.js"></script>
<script src="inline-edit.jquery.js"></script>
```

HTML
```
<span id="example-text"><button class="btn btn-success">Click Me</button></span>
```

JavaScript
```
$("#example-text").inlineEdit({
  type: 'text',
  onChange: function (e, text, html) {
    // Executes when exiting inline edit mode and a change has been made
  },
  onEdit: function (e) {
    // Executes when entering inline edit mode
  },
  onNoChange: function (e) {
    // Executes when exiting inline edit mode but no change has been made
  }
});
```

---

#### Properties

- type (text, select, textarea) - The type of value the clicked text will turn into.
- className - A custom class to add to the created inline edit element.
- on (click, dblclick, etc.) - This is how the inline edit will be triggered
- customData - Custom properties to add to the inline edit tag
- data - Options for the select as a key:value object
- trim (true/false) - Trim whitespace around text before loading into the text input or textarea

#### Methods
- onChange(this, text, html) - Executes when exiting inline edit mode and a change has been made
- onEdit(this) - Executes when entering inline edit mode
- onNoChange(this) - Executes when exiting inline edit mode but no change has been made

#### Events

- inlineEdit.on.edit - Fires when exiting inline edit mode and a change has been made
- inlineEdit.on.change - Fires when entering inline edit mode
- inlineEdit.on.noChange - Fires when exiting inline edit mode but no change has been made

