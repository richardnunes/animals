# 1 - Queries

### **Reminder:** Recommended queries priority

- `*ByRole`: This can be used to query every element that is exposed in the accessibility tree. This should be your top preference for just about everything. Most often, this will be used with the name option like so: `getByRole('button', { name: 'Submit' })`

- `*ByLabelText`: This method is useful for form fields. When navigating through a website form,. This method emulates the behavior of users finding elements using label text. Should be one of your top preferences.

- `*ByPlaceholderText`: A placeholder is not a substitute for a label. But if that's all you have, then it's better than alternatives.

- `*ByText`: Outside of forms, text content is the main way users find elements. This method can be used to find non-interactive elements (`<div>`, `<span>`, and `<p>`).

- `*ByDisplayValue`: The current value of a form element can be useful when navigating a page with filled-in values.

- `*ByAltText`: If your element is one which supports alt text (`<img>`, `<area>`, `<input>`), then you can use this to find that element.

- `*ByTitle`: The title attribute is not consistently read by screen readers, and is not visible by default for sighted users.

- `*ByTestId`: The user cannot see/hear these, so this is only recommended for cases where you can't match by role or text.

