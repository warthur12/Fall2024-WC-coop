# [Viewing Data](https://pandas.pydata.org/docs/user_guide/10min.html#viewing-data)
This document explains how to view and manipulate data within a **pandas DataFrame** using common functionality for inspecting, sorting, and summarizing data.

### 1. **Viewing Data with `.head()` and `.tail()`**
To quickly inspect the top or bottom rows of a DataFrame, use the following methods:
- **`df.head()`**: Displays the first 5 rows (or fewer if the DataFrame is smaller).
- **`df.tail(n)`**: Displays the last `n` rows. For example, `df.tail(3)` returns the last 3 rows.
```python
df.head()
```
- **Output:**
  ```
                     A         B         C         D
  2013-01-01  0.469112 -0.282863 -1.509059 -1.135632
  2013-01-02  1.212112 -0.173215  0.119209 -1.044236
  2013-01-03 -0.861849 -2.104569 -0.494929  1.071804
  2013-01-04  0.721555 -0.706771 -1.039575  0.271860
  2013-01-05 -0.424972  0.567020  0.276232 -1.087401
  ```

```python
df.tail(3)
```
- **Output:**
  ```
                     A         B         C         D
  2013-01-04  0.721555 -0.706771 -1.039575  0.271860
  2013-01-05 -0.424972  0.567020  0.276232 -1.087401
  2013-01-06 -0.673690  0.113648 -1.478427  0.524988
  ```

### 2. **Inspecting Index and Columns**
You can view the index and column labels using `df.index` and `df.columns` respectively:
```python
df.index
```
- **Output:**
  ```
  DatetimeIndex(['2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04',
                 '2013-01-05', '2013-01-06'],
                dtype='datetime64[ns]', freq='D')
  ```

```python
df.columns
```
- **Output:**
  ```
  Index(['A', 'B', 'C', 'D'], dtype='object')
  ```

### 3. **Converting to NumPy Array**
The **`DataFrame.to_numpy()`** method provides a NumPy array of the DataFrame’s values, excluding the index and column labels:
```python
df.to_numpy()
```
- **Output:**
  ```
  array([[ 0.4691, -0.2829, -1.5091, -1.1356],
         [ 1.2121, -0.1732,  0.1192, -1.0442],
         [-0.8618, -2.1046, -0.4949,  1.0718],
         [ 0.7216, -0.7068, -1.0396,  0.2719],
         [-0.425 ,  0.567 ,  0.2762, -1.0874],
         [-0.6737,  0.1136, -1.4784,  0.525 ]])
  ```

For a DataFrame containing mixed types (like `df2`), the output NumPy array will use the `object` dtype:
```python
df2.to_numpy()
```
- **Output:**
  ```
  array([[1.0, Timestamp('2013-01-02 00:00:00'), 1.0, 3, 'test', 'foo'],
         [1.0, Timestamp('2013-01-02 00:00:00'), 1.0, 3, 'train', 'foo'],
         [1.0, Timestamp('2013-01-02 00:00:00'), 1.0, 3, 'test', 'foo'],
         [1.0, Timestamp('2013-01-02 00:00:00'), 1.0, 3, 'train', 'foo']],
        dtype=object)
  ```

**Note**: When converting a DataFrame to a NumPy array, pandas attempts to find the most suitable common data type. If columns have different types, it will use the most general one (e.g., `object`).

### 4. **Statistical Summary with `describe()`**
You can quickly generate descriptive statistics of numeric columns using the **`describe()`** method:
```python
df.describe()
```
- **Output:**
  ```
                A         B         C         D
  count  6.000000  6.000000  6.000000  6.000000
  mean   0.073711 -0.431125 -0.687758 -0.233103
  std    0.843157  0.922818  0.779887  0.973118
  min   -0.861849 -2.104569 -1.509059 -1.135632
  25%   -0.611510 -0.600794 -1.368714 -1.076610
  50%    0.022070 -0.228039 -0.767252 -0.386188
  75%    0.658444  0.041933 -0.034326  0.461706
  max    1.212112  0.567020  0.276232  1.071804
  ```

### 5. **Transposing a DataFrame**
Use **`df.T`** to transpose the DataFrame, switching rows with columns:
```python
df.T
```
- **Output:**
  ```
         2013-01-01  2013-01-02  2013-01-03  2013-01-04  2013-01-05  2013-01-06
  A       0.469112    1.212112   -0.861849    0.721555   -0.424972   -0.673690
  B      -0.282863   -0.173215   -2.104569   -0.706771    0.567020    0.113648
  C      -1.509059    0.119209   -0.494929   -1.039575    0.276232   -1.478427
  D      -1.135632   -1.044236    1.071804    0.271860   -1.087401    0.524988
  ```

### 6. **Sorting Data**
- **`sort_index()`**: Sorts the DataFrame by the index (rows or columns). In this example, it sorts columns in descending order:
  ```python
  df.sort_index(axis=1, ascending=False)
  ```
  - **Output:**
    ```
                       D         C         B         A
    2013-01-01 -1.135632 -1.509059 -0.282863  0.469112
    2013-01-02 -1.044236  0.119209 -0.173215  1.212112
    2013-01-03  1.071804 -0.494929 -2.104569 -0.861849
    ```

- **`sort_values(by="B")`**: Sorts rows based on the values in column **B**:
  ```python
  df.sort_values(by="B")
  ```
  - **Output:**
    ```
                     A         B         C         D
    2013-01-03 -0.861849 -2.104569 -0.494929  1.071804
    2013-01-04  0.721555 -0.706771 -1.039575  0.271860
    2013-01-01  0.469112 -0.282863 -1.509059 -1.135632
    ```

### Expansion
These methods allow users to easily explore, inspect, and manipulate DataFrames. Whether viewing summary statistics, converting to a NumPy array, or sorting values, these operations are essential for efficient data analysis with pandas. The flexibility of sorting and the use of indexes/columns is particularly useful for data wrangling and cleaning.