# [Selection](https://pandas.pydata.org/docs/user_guide/10min.html#selection)
**Note**  
While standard Python / NumPy expressions for selecting and setting are intuitive and useful for interactive work, it is recommended to use optimized pandas methods like `DataFrame.at()`, `DataFrame.iat()`, `DataFrame.loc()`, and `DataFrame.iloc()` for production code.

Refer to the indexing documentation: *Indexing and Selecting Data* and *MultiIndex / Advanced Indexing* for more.

---

### Getitem ([])

- For a DataFrame, passing a single label selects a column and returns a Series (e.g., `df["A"]`):

    ```python
    df["A"]
    ```

    Output:
    ```
    2013-01-01    0.469112
    2013-01-02    1.212112
    2013-01-03   -0.861849
    2013-01-04    0.721555
    2013-01-05   -0.424972
    2013-01-06   -0.673690
    Freq: D, Name: A, dtype: float64
    ```

- Passing a slice selects matching rows (e.g., `df[0:3]`):

    ```python
    df[0:3]
    ```

    Output:
    ```
                        A         B         C         D
    2013-01-01  0.469112 -0.282863 -1.509059 -1.135632
    2013-01-02  1.212112 -0.173215  0.119209 -1.044236
    2013-01-03 -0.861849 -2.104569 -0.494929  1.071804
    ```

---

### Selection by Label

For row selection by label, use `DataFrame.loc()` or `DataFrame.at()`.

- Selecting a row by label:

    ```python
    df.loc[dates[0]]
    ```

    Output:
    ```
    A    0.469112
    B   -0.282863
    C   -1.509059
    D   -1.135632
    Name: 2013-01-01 00:00:00, dtype: float64
    ```

- Selecting specific columns for all rows:

    ```python
    df.loc[:, ["A", "B"]]
    ```

    Output:
    ```
                        A         B
    2013-01-01  0.469112 -0.282863
    2013-01-02  1.212112 -0.173215
    2013-01-03 -0.861849 -2.104569
    2013-01-04  0.721555 -0.706771
    2013-01-05 -0.424972  0.567020
    2013-01-06 -0.673690  0.113648
    ```

- Selecting both rows and columns by label:

    ```python
    df.loc["20130102":"20130104", ["A", "B"]]
    ```

    Output:
    ```
                        A         B
    2013-01-02  1.212112 -0.173215
    2013-01-03 -0.861849 -2.104569
    2013-01-04  0.721555 -0.706771
    ```

- Selecting a specific row and column to get a scalar value:

    ```python
    df.loc[dates[0], "A"]
    ```

    Output:
    ```
    0.4691122999071863
    ```

- Quick access to scalar using `DataFrame.at()`:

    ```python
    df.at[dates[0], "A"]
    ```

    Output:
    ```
    0.4691122999071863
    ```

---

### Selection by Position

For selecting by position, use `DataFrame.iloc()` or `DataFrame.iat()`.

- Selecting by position:

    ```python
    df.iloc[3]
    ```

    Output:
    ```
    A    0.721555
    B   -0.706771
    C   -1.039575
    D    0.271860
    Name: 2013-01-04 00:00:00, dtype: float64
    ```

- Slicing rows and columns by position:

    ```python
    df.iloc[3:5, 0:2]
    ```

    Output:
    ```
                        A         B
    2013-01-04  0.721555 -0.706771
    2013-01-05 -0.424972  0.567020
    ```

- Selecting specific positions with lists:

    ```python
    df.iloc[[1, 2, 4], [0, 2]]
    ```

    Output:
    ```
                        A         C
    2013-01-02  1.212112  0.119209
    2013-01-03 -0.861849 -0.494929
    2013-01-05 -0.424972  0.276232
    ```

- Slicing all rows, specific columns:

    ```python
    df.iloc[:, 1:3]
    ```

    Output:
    ```
                        B         C
    2013-01-01 -0.282863 -1.509059
    2013-01-02 -0.173215  0.119209
    2013-01-03 -2.104569 -0.494929
    2013-01-04 -0.706771 -1.039575
    2013-01-05  0.567020  0.276232
    2013-01-06  0.113648 -1.478427
    ```

- Get a value quickly using `DataFrame.iat()`:

    ```python
    df.iat[1, 1]
    ```

    Output:
    ```
    -0.17321464905330858
    ```

---

### Boolean Indexing

- Select rows based on conditions (e.g., `df.A > 0`):

    ```python
    df[df["A"] > 0]
    ```

    Output:
    ```
                        A         B         C         D
    2013-01-01  0.469112 -0.282863 -1.509059 -1.135632
    2013-01-02  1.212112 -0.173215  0.119209 -1.044236
    2013-01-04  0.721555 -0.706771 -1.039575  0.271860
    ```

- Selecting where conditions are met for all columns:

    ```python
    df[df > 0]
    ```

    Output:
    ```
                        A         B         C         D
    2013-01-01  0.469112       NaN       NaN       NaN
    2013-01-02  1.212112       NaN  0.119209       NaN
    2013-01-03       NaN       NaN       NaN  1.071804
    2013-01-04  0.721555       NaN       NaN  0.271860
    2013-01-05       NaN  0.567020  0.276232       NaN
    2013-01-06       NaN  0.113648       NaN  0.524988
    ```

- Using `isin()` to filter:

    ```python
    df2[df2["E"].isin(["two", "four"])]
    ```

    Output:
    ```
                        A         B         C         D     E
    2013-01-03 -0.861849 -2.104569 -0.494929  1.071804   two
    2013-01-05 -0.424972  0.567020  0.276232 -1.087401  four
    ```

---

### Setting

- Automatically align data by indexes when setting a new column:

    ```python
    df["F"] = s1
    ```

- Setting values by label:

    ```python
    df.at[dates[0], "A"] = 0
    ```

- Setting values by position:

    ```python
    df.iat[0, 1] = 0
    ```

- Set columns with a NumPy array:

    ```python
    df.loc[:, "D"] = np.array([5] * len(df))
    ```

Output:
```
                        A         B         C    D    F
2013-01-01  0.000000  0.000000 -1.509059  5.0  NaN
2013-01-02  1.212112 -0.173215  0.119209  5.0  1.0
2013-01-03 -0.861849 -2.104569 -0.494929  5.0  2.0
2013-01-04  0.721555 -0.706771 -1.039575  5.0  3.0
2013-01-05 -0.424972  0.567020  0.276232  5.0  4.0
2013-01-06 -0.673690  0.113648 -1.478427  5.0  5.0
```

---

### Using where operations for setting values

You can apply a `where` operation and set the result directly on the DataFrame.

- For example, the following negates positive values:

```python
df2 = df.copy()
df2[df2 > 0] = -df2
```

Output:
```
                        A         B         C    D    F
2013-01-01  0.000000  0.000000 -1.509059 -5.0  NaN
2013-01-02 -1.212112 -0.173215 -0.119209 -5.0 -1.0
2013-01-03 -0.861849 -2.104569 -0.494929 -5.0 -2.0
2013-01-04 -0.721555 -0.706771 -1.039575 -5.0 -3.0
2013-01-05 -0.424972 -0.567020 -0.276232 -5.0 -4.0
2013-01-06 -0.673690 -0.113648 -1.478427 -5.0 -5.0
```

In this operation, all positive values in the DataFrame `df2` were negated, transforming them into their negative counterparts.

