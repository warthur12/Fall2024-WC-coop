# [Object Creation](https://pandas.pydata.org/docs/user_guide/10min.html#object-creation)
## Object Creation
In this excerpt, the process of object creation in **pandas** (a Python library for data manipulation) is discussed, showcasing different ways to create **Series** and **DataFrame** objects.

### 1. **Creating a Series**
A **Series** is a one-dimensional array-like structure in pandas. Here, a Series is created by passing a list of values, where pandas automatically assigns a **RangeIndex** (default integer index starting from 0):
```python
s = pd.Series([1, 3, 5, np.nan, 6, 8])
```
- **Output:**
  ```
  0    1.0
  1    3.0
  2    5.0
  3    NaN
  4    6.0
  5    8.0
  dtype: float64
  ```
This Series contains integers and a `NaN` value, with an automatic index (0 to 5).

### 2. **Creating a DataFrame with NumPy Array**
A **DataFrame** is a two-dimensional table-like data structure. Here, a DataFrame is created by passing a **NumPy array** with a **DatetimeIndex** using `date_range()` for the index, and labeled columns:
```python
dates = pd.date_range("20130101", periods=6)
df = pd.DataFrame(np.random.randn(6, 4), index=dates, columns=list("ABCD"))
```
- **Output:**
  ```
                     A         B         C         D
  2013-01-01  0.469112 -0.282863 -1.509059 -1.135632
  2013-01-02  1.212112 -0.173215  0.119209 -1.044236
  2013-01-03 -0.861849 -2.104569 -0.494929  1.071804
  2013-01-04  0.721555 -0.706771 -1.039575  0.271860
  2013-01-05 -0.424972  0.567020  0.276232 -1.087401
  2013-01-06 -0.673690  0.113648 -1.478427  0.524988
  ```
This DataFrame contains 6 rows (indexed by dates) and 4 columns labeled 'A', 'B', 'C', and 'D', with random numbers as values.

### 3. **Creating a DataFrame using a Dictionary**
A DataFrame can also be created by passing a dictionary where keys represent column names and values are objects for each column. In this case:
```python
df2 = pd.DataFrame({
    "A": 1.0,
    "B": pd.Timestamp("20130102"),
    "C": pd.Series(1, index=list(range(4)), dtype="float32"),
    "D": np.array([3] * 4, dtype="int32"),
    "E": pd.Categorical(["test", "train", "test", "train"]),
    "F": "foo"
})
```
- **Output:**
  ```
     A          B    C  D      E    F
  0  1.0 2013-01-02  1.0  3   test  foo
  1  1.0 2013-01-02  1.0  3  train  foo
  2  1.0 2013-01-02  1.0  3   test  foo
  3  1.0 2013-01-02  1.0  3  train  foo
  ```
Here, `A` is a float, `B` is a timestamp, `C` is a Series with `float32` values, `D` is a NumPy array with integers, `E` is a categorical variable, and `F` is a constant string column.

### 4. **DataFrame Column Types**
The `dtypes` attribute of a DataFrame provides the data type of each column:
```python
df2.dtypes
```
- **Output:**
  ```
  A          float64
  B    datetime64[s]
  C          float32
  D            int32
  E         category
  F           object
  dtype: object
  ```
This shows the types of data stored in each column: `A` is `float64`, `B` is a `datetime64`, `C` is `float32`, `D` is `int32`, `E` is a `category`, and `F` is an `object` (string).

### 5. **Using IPython Tab Completion**
In IPython, tab completion helps users explore the attributes and columns of a DataFrame. Typing `df2.<TAB>` allows easy access to columns like `A`, `B`, `C`, `D`, as well as several DataFrame methods and attributes (`abs`, `add`, `align`, etc.).

### Expansion
These examples illustrate the flexibility of pandas in creating data structures from a variety of input types: lists, NumPy arrays, timestamps, categorical data, and dictionaries. The ability to handle heterogeneous data types in a single DataFrame makes pandas particularly useful for data analysis.