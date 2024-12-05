# [Plotting](https://pandas.pydata.org/docs/user_guide/10min.html#plotting)
### Plotting in Pandas

Pandas integrates seamlessly with **Matplotlib**, a popular plotting library in Python, for creating visualizations. This allows you to generate a wide variety of plots directly from pandas Series and DataFrames with simple, concise code.

#### 1. **Matplotlib Setup**

To use plotting functionalities in pandas, the standard practice is to import Matplotlib's `pyplot` module:

```python
import matplotlib.pyplot as plt
```

The `plt.close("all")` command is used to close all active figure windows. This can be helpful in situations where multiple figures are open, or when you want to reset the plot display.

#### 2. **Plotting a Series**

You can easily plot a pandas **Series** using the `.plot()` method. For example, if you create a time series of cumulative sums (often used to visualize trends), it can be plotted as follows:

```python
ts = pd.Series(np.random.randn(1000), index=pd.date_range("1/1/2000", periods=1000))
ts = ts.cumsum()
ts.plot();
```

This produces a simple line plot. In **Jupyter Notebooks**, the plot will be displayed automatically, but in standalone scripts, you need to explicitly display the plot using:

```python
plt.show()
```

Alternatively, if you want to save the plot to a file, you can use:

```python
plt.savefig("plot.png")
```

![[Pasted image 20241023102413.png]]

#### 3. **Plotting a DataFrame**

You can plot all columns of a pandas **DataFrame** at once. Each column will be plotted as a separate line by default. For example, let's generate a DataFrame of random data and plot its cumulative sum:

```python
df = pd.DataFrame(np.random.randn(1000, 4), index=ts.index, columns=["A", "B", "C", "D"])
df = df.cumsum()
plt.figure();
df.plot();
plt.legend(loc='best');
```

This creates a plot with four lines (one for each column: A, B, C, D). The `plt.legend(loc='best')` command automatically places the legend in the best possible location on the plot.

![[Pasted image 20241023102535.png]]

#### 4. **Plot Customization**

Pandas relies on Matplotlib for plotting, so you have access to the full range of Matplotlib customization options. Some common options include:
- **Changing plot types**: You can create other types of plots such as bar charts, histograms, and scatter plots by specifying the `kind` parameter in `plot()`. For example, to create a bar chart:
  ```python
  df.plot(kind='bar');
  ```
![[Pasted image 20241023102630.png]]
- **Adding labels**: You can add titles, axis labels, and other annotations to the plot:
	- **Note**: You need to run `df.plot` before setting the title, xlabel, ylabel, etc.
  ```python
  plt.title("Cumulative Sum of Data")
  plt.xlabel("Date")
  plt.ylabel("Values")
  ```
![[Pasted image 20241023102852.png]]
#### 5. **Importing and Exporting Data for Plotting**

Before you plot data, you often need to import it from external sources (e.g., CSV, Excel files, SQL databases). Pandas provides various **I/O (Input/Output) Tools** to easily read and write data to different formats. Once you import the data into a DataFrame, it can be plotted directly. For instance:

```python
df = pd.read_csv('data.csv')
df.plot();
```

![[Pasted image 20241023103254.png]]

After generating plots, you can export them to image files (PNG, JPEG, PDF) using `plt.savefig()` for further use in reports or presentations.

---

### Key Points to Remember:
1. **Integration with Matplotlib**: Pandas uses Matplotlib for plotting, allowing you to use a simple `.plot()` method on Series or DataFrames to generate visualizations.
2. **Interactive and Script Usage**: In Jupyter, plots are automatically displayed, but in standalone scripts, you need to call `plt.show()` explicitly.
3. **Full Customization**: You can fully customize the plot using Matplotlib functions, allowing for extensive flexibility.
4. **Multiple Plot Types**: Pandas offers different plot types like line, bar, scatter, and histograms via the `kind` parameter.

Using pandas for plotting makes data visualization fast and accessible, especially for those familiar with Matplotlib's capabilities.