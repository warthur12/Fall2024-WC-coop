# [Merge](https://pandas.pydata.org/docs/user_guide/10min.html#merge)
### Merging and Concatenating DataFrames in Pandas

Pandas provides versatile tools for combining `Series` and `DataFrame` objects, with functionalities similar to set operations and relational algebra. The two main approaches are **concatenation** and **joining/merging**.

---

### Concatenation

Concatenation is used to combine pandas objects along a particular axis, most commonly row-wise. This is achieved with the `pd.concat()` function.

- **Example**: Concatenating multiple pieces of a DataFrame:

  ```python
  df = pd.DataFrame(np.random.randn(10, 4))
  
  pieces = [df[:3], df[3:7], df[7:]]
  pd.concat(pieces)
  ```

  Output:

  ```
            0         1         2         3
  0 -0.548702  1.467327 -1.015962 -0.483075
  1  1.637550 -1.217659 -0.291519 -1.745505
  2 -0.263952  0.991460 -0.919069  0.266046
  3 -0.709661  1.669052  1.037882 -1.705775
  4 -0.919854 -0.042379  1.247642 -0.009920
  5  0.290213  0.495767  0.362949  1.548106
  6 -1.131345 -0.089329  0.337863 -0.945867
  7 -0.932132  1.956030  0.017587 -0.016692
  8 -0.575247  0.254161 -1.143704  0.215897
  9  1.193555 -0.077118 -0.408530 -0.862495
  ```
> The dateframe had been broken into pieces (row 0-3, 3-7, and 7-9) then concatenated back together to form the same dataframe as before.
#### Note on Performance:
- Adding columns to a `DataFrame` is generally efficient.
- Adding rows, however, requires creating a copy of the `DataFrame`, which can be slow. It's recommended to create a `DataFrame` with pre-built data, rather than appending rows iteratively.

---

### Join / Merge

The `merge()` function in pandas enables SQL-like joins between DataFrames. This function aligns two DataFrames along a common key and allows for different join types (inner, outer, left, right).

- **Example**: Basic join using a common key:

  ```python
  left = pd.DataFrame({"key": ["foo", "foo"], "lval": [1, 2]})
  right = pd.DataFrame({"key": ["foo", "foo"], "rval": [4, 5]})
  
  pd.merge(left, right, on="key")
  ```

  Output:

  ```
     key  lval  rval
  0  foo     1     4
  1  foo     1     5
  2  foo     2     4
  3  foo     2     5
  ```

In this example, the merge results in all combinations of the matching keys, producing a Cartesian product for the `foo` key.

- **Example**: Merge on unique keys:

  ```python
  left = pd.DataFrame({"key": ["foo", "bar"], "lval": [1, 2]})
  right = pd.DataFrame({"key": ["foo", "bar"], "rval": [4, 5]})
  
  pd.merge(left, right, on="key")
  ```

  Output:

  ```
     key  lval  rval
  0  foo     1     4
  1  bar     2     5
  ```

Here, the merge aligns the `foo` and `bar` keys across both DataFrames.

---

### Key Points:
- **Concatenation (`pd.concat`)**: Used to combine DataFrames along rows or columns, creating a new DataFrame that includes all the data.
- **Merging (`pd.merge`)**: Functions similarly to SQL joins, allowing DataFrames to be merged on common columns or indexes. Various join types are available, such as inner, outer, left, and right.

By using these methods, pandas provides a powerful toolkit for combining datasets in a flexible and efficient way.