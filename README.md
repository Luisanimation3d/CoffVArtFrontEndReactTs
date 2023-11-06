# Props of Components

> ## Component **Button**

Renders a button in the interface and accepts the following properties:

| Prop name | Type                       | Description                                                                                           | Mandatory | Default   |
| --------- | -------------------------- | ----------------------------------------------------------------------------------------------------- | --------- | --------- |
| text      | string or JSX.Element      | This property represents the text or JSX element displayed on the button.                            | Optional  | ""        |
| onClick   | Function                   | This property is the action that the button will perform when clicked.                                | Optional  | undefined |
| autosize  | boolean                    | This property determines whether the button size is automatically adjusted based on its content.  | Optional  | true      |
| disabled  | boolean                    | This property disables the button when set to `true`.                                                 | Optional  | false     |
| fill      | boolean                    | This property receives `true` if the button will be filled, and `false` if the button will be outlined. | Optional  | true      |

Example code:

```TSX
<Button
	text="Click Me"
	onClick={() => console.log('Button clicked')}
	autosize={true}
	disabled={false}
	fill={true}
/>
```
---
> ## Component **Table**

Renders a table in the interface and accepts the following properties:

| Prop name       | Type          | Description                                                                                        | Mandatory | Default   |
| --------------- | ------------- | -------------------------------------------------------------------------------------------------- | --------- | --------- |
| columns         | Column[]      | An array of column definitions, each containing a `key` (string) and a `header` (string).            | required  | []        |
| data            | any[]         | An array of data objects to be displayed in the table.                                             | required  | []        |
| onRowClick      | Function      | A function to handle a click event on a row.                                                         | required  | undefined |
| optionButtons   | OptionButton[]| An array of option buttons to be displayed in the dropdown menu.                                    | Optional  | []        |
| editableAction  | OptionButton  | An option button for performing an editable action.                                                  | required  | undefined |
| deleteAction    | OptionButton  | An option button for performing a delete action.                                                    | required  | undefined |

Example code:

```tsx
<Table
  columns={[
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    // Add more column definitions as needed
  ]}
  data={[
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' },
    // Add more data objects as needed
  ]}
  onRowClick={(row) => console.log('Row clicked', row)}
  optionButtons={[
    {
      icon: <YourIconComponent />,
      label: 'Custom Action',
      onClick: (row) => console.log('Custom action clicked', row),
    },
    // Add more option buttons as needed
  ]}
  editableAction={{
    icon: <YourEditIconComponent />,
    label: 'Edit',
    onClick: (row) => console.log('Edit action clicked', row),
  }}
  deleteAction={{
    icon: <YourDeleteIconComponent />,
    label: 'Delete',
    onClick: (row) => console.log('Delete action clicked', row),
  }}
/>
```

> ### Type **Column**

Represents a column definition for the table.

| Property  | Type    | Description                                           | Mandatory | Default   |
| --------- | ------- | ----------------------------------------------------- | --------- | --------- |
| key       | string  | A unique identifier for the column.                   | required  | undefined |
| header    | string  | The header text to display for the column.           | required  | undefined |

Example usage:

```typescript
const columns: Column[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  // Add more column definitions as needed
];
```
> ### Type **OptionButton**

Represents a column definition for the table.

| Property  | Type    | Description                                           | Mandatory | Default   |
| --------- | ------- | ----------------------------------------------------- | --------- | --------- |
| icon     | JSX Element  | An optional icon to display.           | Optional  | undefined |
| label    | string  | The label text for the option button.           | Optional  | undefined |
| onClick    | onClick  | The action to perform when clicked. | required  | undefined |

Example usage:

```typescript
const optionButtons: OptionButton[] = [
  {
    icon: <YourIconComponent />,
    label: 'Custom Action',
    onClick: (row) => console.log('Custom action clicked', row),
  },
  // Add more option buttons as needed
];
```
---

> ## Component **Form**

Renders a form in the interface and accepts the following properties:

| Prop name       | Type             | Description                                                                         | Mandatory | Default   |
| --------------- |------------------| ----------------------------------------------------------------------------------- | --------- | --------- |
| title           | String           | This property prints the form title on the screen. It is displayed as an h1.       | Optional  | null      |
| fields          | FormField[]      | This property receives an array of FormField type with the fields to be rendered. | required  | undefined |
| onSubmit        | Function         | This property is the action that the form will perform when submitted.            | required  | undefined |
| button          | JSX Button Element | This property displays the form button on the screen.                             | required  | undefined |
| editable         | Boolean          | This property defines if the form is editable.                                     | Optional  | false     |
| errors          | Errors           | This property receives an array with the errors per field.                        | Optional  | undefined |
| cancelButton     | Boolean          | This property determines whether a cancel button is displayed.                    | Optional  | true      |
| extraElements   | JSX Element      | This property allows for additional elements to be added to the form.              | Optional  | undefined |

Example code:

```tsx
<Form
  title='Login'
  fields={loginFields}
  onSubmit={handleSubmit}
  button={<Button text='Sign In' onClick={(e) => console.log('sign in')} fill={true} />}
/>
```

> ### Type **FormField**

It is an interface for form fields and accepts the following properties:

| Property  | Type           | Description                                            | Mandatory | Default   |
| --------- |----------------|--------------------------------------------------------|-----------| --------- |
| name      | string         | This property receives the name to identify the input. | required  | undefined |
| label     | string         | This property receives the label text for the input.   | required  | undefined |
| type      | string         | This property represents the type of the field.        | required  | undefined |
| value     | string         | This property receives an optional value for the input. | Optional  | undefined |
| options  | optionField[]  | This property is required for select fields. | Optional  | undefined |
|placeholder	|string	|This property receives the placeholder text for the input.|	Optional	|undefined|

```tsx
const loginFields: FormField[] = [
    {
        name: 'Name',
        type: 'text',
        label: 'Full Name',
    },
    {
        name: 'Carreer',
        type: 'text',
        label: 'Carreer',
    },
];
```

> ### Type **optionField**
Represents an option for select fields.

| Property  | Type           | Description                                            | Mandatory | Default   |
| --------- |----------------|--------------------------------------------------------|-----------| --------- |
| value     | string         | This property receives the value of the option. | required  | undefined |
| label     | string         | This property receives the label text for the option.   | required  | undefined |

```tsx
const loginFields: FormField[] = [
    {
        name: 'Food',
        type: 'select',
        label: 'Food',
        oprions: [
            {
                value: 'hotDog',
                label: 'Hot Dog'
            },
            {
                value: 'burger',
                label: 'Burger'
            }
        ]    
    }
];
```
> ### Type **Errors**

Represents an object that holds error messages for form fields.

| Property  | Type           | Description                                            | Mandatory | Default   |
| --------- |----------------|--------------------------------------------------------|-----------| --------- |
| [key]	| string | The property name represents the form field, and its value is the error message associated with it. | required  | undefined |

```tsx

const errors: Errors =
    {
        name: 'error message for Field1',
        lastName: 'Error message for Field2',
    }
;
```
---

> ## Component **ModalContainer**

Renders a container for the modal and accepts the following properties:

| Prop name | Type                               | Description                                           | Mandatory | Default   |
| --------- | ---------------------------------- | ----------------------------------------------------- | --------- | --------- |
| children  | JSX.Element or JSX.Element[]       | The content to be displayed within the modal container. | required  | undefined |
| ShowModal | Function                           | This property is a callback function to show/hide the modal. | required  | undefined |

Example code:

```tsx
<ModalContainer ShowModal={(show) => console.log(`Modal is ${show ? 'open' : 'closed'}`)}>
  {/* Content to be displayed in the modal container */}
</ModalContainer>
```
> ## Component **Modal**
Renders a modal dialog and accepts the following properties:

| Prop name | Type                               | Description                                           | Mandatory | Default   |
| --------- | ---------------------------------- | ----------------------------------------------------- | --------- | --------- |
|title|	string	|This property represents the title of the modal.	|Optional	|undefined|
|children|	JSX.Element or JSX.Element[]	|The content to be displayed within the modal.	|required	|undefined|
|showModal|	Function	|This property is a callback function to show/hide the modal.	|required	|undefined|

Example code:

```tsx
<Modal
  title="My Modal"
  showModal={(show) => console.log(`Modal is ${show ? 'open' : 'closed'}`)}
>
  {/* Content to be displayed in the modal */}
</Modal>
```
---

> ## Component **SideBarMenu**

Renders a sidebar menu and accepts the following properties:

| Prop name | Type                                | Description                                                                                        | Mandatory | Default   |
| --------- | ----------------------------------- | -------------------------------------------------------------------------------------------------- | --------- | --------- |
| items     | SideBarMenuItemProps[]              | An array of menu items to be displayed in the sidebar.                                           | required  | undefined |

Example code:

```tsx
<SideBarMenu items={sideBarMenuItems} />
```
> ### Type **SideBarMenuItemProps**

Represents an object that holds error messages for form fields.

| Property  | Type           | Description                                            | Mandatory | Default   |
| --------- |----------------|--------------------------------------------------------|-----------| --------- |
| icon      | JSX.Element    | The icon to be displayed alongside the title.| required  | undefined |
| title     | string         | The title of the menu item.   | required  | undefined |
|link | string | The URL link for the menu item. | required  | undefined |
```tsx
<SideBarMenuItem
    title="Dashboard"
    link="/dashboard"
    icon={<FiHome />}
/>
```
> ### Modify **Admin Routes**

To modify the routes of the admin panel, you must modify the file `src/components/Routes/AdminRoutes.tsx`. This file contains the routes of the admin panel and is exported as a component. The routes are defined as follows:

```tsx
const adminRoutes: SideBarMenuItemProps[] = [
  {
    title: 'Dashboard',
    link: '/',
    icon: <FiHome />,
  },
  {
    title: 'Roles',
    link: '/Roles',
    icon: <FiHexagon />,
  },
];
```
---
> ## Component **SearchInput**

Renders a search input field and accepts the following properties:

| Prop name | Type                                | Description                                                                                        | Mandatory | Default   |
| --------- | ----------------------------------- | -------------------------------------------------------------------------------------------------- | --------- | --------- |
| label     | string                              | The label for the search input.                                                                   | required  | undefined |
| value     | string                              | The current value of the input.                                                                  | required  | undefined |
| onChange  | (e: React.ChangeEvent<HTMLInputElement>) => void | A function to handle input changes.                                           | required  | undefined |
| idSearch  | string                              | The HTML `id` attribute for the input element.                                                    | required  | undefined |

Example code:

```tsx
<SearchInput
  label="Search"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  idSearch="searchInput"
/>
```
---
# Props of Components

> ## Component **Container**

Renders a container for holding content and accepts the following properties:

| Prop name | Type      | Description                        | Mandatory | Default   |
| --------- | --------- | ---------------------------------- | --------- | --------- |
| children  | ReactNode | The content to be displayed inside the container. | required  | undefined |

Example code:

```tsx
<Container>
  {/* Content goes here */}
</Container>
```
---
# Props of Components

> ## Component **Titles**

Renders a title with a specified level and accepts the following properties:

| Prop name | Type   | Description                                      | Mandatory | Default |
| --------- | ------ | ------------------------------------------------ | --------- | ------- |
| title     | String | The text to be displayed as the title.           | required  | -       |
| level     | Number | The heading level (1 to 6) for the title.        | Optional  | 1       |

Example code:

```tsx
<Titles title="Example Title" level={2} />
```
