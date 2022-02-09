# 1. Queries

Queries are types of methods that RTL gives us to find elements on the page such as `get`, `find`, `query`. The difference between them is whether the query will throw an error if no element is found or if it will return a Promise and retry. Depending on what page content we select, different queries may be more or less appropriate. 

A [priority guide](https://testing-library.com/docs/queries/about/#priority) recommends on how to make use of semantic queries to test your components in the most accessible way:

1. `*ByRole`: This can be used to query every element that is exposed in the accessibility tree. This should be your top preference for just about everything. Most often, this will be used with the name option like so: `getByRole('button', { name: 'Submit' })`

2. `*ByLabelText`: This method is useful for form fields. When navigating through a website form,. This method emulates the behavior of users finding elements using label text. Should be one of your top preferences.

3. `*ByPlaceholderText`: A placeholder is not a substitute for a label. But if that's all you have, then it's better than alternatives.

4. `*ByText`: Outside of forms, text content is the main way users find elements. This method can be used to find non-interactive elements (`<div>`, `<span>`, and `<p>`).

5. `*ByDisplayValue`: The current value of a form element can be useful when navigating a page with filled-in values.

6. `*ByAltText`: If your element is one which supports alt text (`<img>`, `<area>`, `<input>`), then you can use this to find that element.

7. `*ByTitle`: The title attribute is not consistently read by screen readers, and is not visible by default for sighted users.

8. `*ByTestId`: The user cannot see/hear these, so this is only recommended for cases where you can't match by role or text.
## Task

Test the UI components in `InfoTile` get rendered as expected.

1. Go to file `/src/tests/task-01-queries.test.js`
2. Write tests for each test case on the file.

#### Next: [Solution for 1. Queries](./SOLUTION.md)
