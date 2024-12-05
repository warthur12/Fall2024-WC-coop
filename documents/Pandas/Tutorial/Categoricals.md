# [Categoricals](https://pandas.pydata.org/docs/user_guide/10min.html#categoricals)
### Categoricals in Pandas

Pandas provides support for **categorical data**, which is a data type suitable for variables that can take on a limited, fixed number of possible values. Categorical data can improve performance, save memory, and provide a natural way to work with ordered or unordered categories.

Here's a summary and expansion on how categoricals work in pandas, using an example dataset of raw grades.

### 1. **Creating a Categorical Data Type**

Consider the following DataFrame with raw grades:

```python
df = pd.DataFrame(
    {"id": [1, 2, 3, 4, 5, 6], "raw_grade": ["a", "b", "b", "a", "a", "e"]}
)
```

Here, `"raw_grade"` contains grades that are nominal (unordered) categories. To convert this column into a **categorical** type, we use:

```python
df["grade"] = df["raw_grade"].astype("category")
```

Now, the `"grade"` column is a categorical data type, containing three categories: `['a', 'b', 'e']`.

#### Full Print
```python
df = pd.DataFrame(
    {"id": [1, 2, 3, 4, 5, 6], "raw_grade": ["a", "b", "b", "a", "a", "e"]}
)

df["grade"] = df["raw_grade"].astype("category")

print(df)
print(df["grade"])
```

**Output**:
```
   id raw_grade grade
0   1         a     a
1   2         b     b
2   3         b     b
3   4         a     a
4   5         a     a
5   6         e     e

0    a
1    b
2    b
3    a
4    a
5    e
Name: grade, dtype: category
Categories (3, object): ['a', 'b', 'e']
```

### 2. **Renaming Categories**

Pandas allows renaming categories to more meaningful labels. For example, we can rename the raw grades to `"very good"`, `"good"`, and `"very bad"`:

```python
new_categories = ["very good", "good", "very bad"]
df["grade"] = df["grade"].cat.rename_categories(new_categories)

print(df)
print(df["grade"])
```

**Output**:
```
   id raw_grade      grade
0   1         a  very good
1   2         b       good
2   3         b       good
3   4         a  very good
4   5         a  very good
5   6         e   very bad

0    very good
1         good
2         good
3    very good
4    very good
5     very bad
```

This transformation updates the category labels while maintaining the categorical structure.

### 3. **Reordering and Expanding Categories**

We can reorder the categories and add new ones that might not have been present in the data using `set_categories()`. This method is especially useful when you need to impose an order or include categories that are currently missing in the data. 

For example, we can add `"bad"` and `"medium"` as additional categories, even though no data points fall into these categories yet:

```python
df["grade"] = df["grade"].cat.set_categories(
    ["very bad", "bad", "medium", "good", "very good"]
)
```

Now, the new order and expanded categories are: `['very bad', 'bad', 'medium', 'good', 'very good']`.

> [!note] 
> In order to use `cat.set_categories` you need to make sure that there is an equal number of categories at all levels of the mutation. Eg. If there are 5 categories there needs to be 5 different categories when the DF is created, when the categories are renamed with `cat.rename_categories` and finally when you use `cat.set_categories`.
> The categories can be named anything but the count needs to be the same.

### 4. **Sorting Categorical Data**

Categorical data can be sorted according to the specified order of the categories, **not** lexicographically (alphabetically). This makes sorting more intuitive when working with ordinal data, like grades or ranks.

For example, sorting the DataFrame by the `"grade"` column will follow the order of the categories:

```python
df.sort_values(by="grade")
```

The result will place `"very bad"` before `"good"`, and `"very good"` will appear last, as per the defined order.

### 5. **Grouping by Categorical Data**

When grouping by a categorical column, pandas can show empty categories that do not have any data. For example:

```python
df.groupby("grade", observed=False).size()
```

This outputs the count of rows for each category, including the categories (`"bad"` and `"medium"`) that have no corresponding values in the data.

Output:
```
grade
very bad     1
bad          0
medium       0
good         2
very good    3
```

By setting `observed=False`, pandas includes all categories, even those that have no observations. This is useful when you want a complete view of all potential categories in your analysis.

---

### Why Use Categorical Data?

1. **Memory Efficiency**: Categorical data uses less memory, especially when the same values are repeated frequently (e.g., grades, product categories).
   
2. **Performance Gains**: Operations like sorting and grouping can be faster with categorical data because pandas can work directly with numerical category codes instead of strings.
   
3. **Ordered Data**: You can specify an order to categories (e.g., low to high) which allows pandas to perform meaningful sorting and comparisons.
   
4. **Missing Categories**: Categorical data can account for all possible categories, even if some don't appear in the dataset. This is useful in ensuring a complete categorical view in reports or analysis.

### Example Use Cases for Categoricals
- **Survey Data**: Responses like "Strongly Agree", "Agree", "Neutral", "Disagree", and "Strongly Disagree" can be represented as ordered categorical data.
- **Product Categories**: In e-commerce, product categories (e.g., "Electronics", "Clothing", "Books") can be stored as unordered categories.
- **Grade Levels**: Education datasets with grades like "A", "B", "C", "D", and "F" can benefit from ordered categoricals for proper sorting and analysis.

### Conclusion
Using categorical data in pandas not only optimizes performance and memory usage but also introduces a powerful way to work with ordered or unordered values. Through renaming, reordering, and grouping, categoricals provide flexibility and efficiency in managing discrete data in pandas DataFrames.