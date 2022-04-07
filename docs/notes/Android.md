

# Android开发基础

## 1、控件

### 1.1、TextView

#### 1.1.1、内容水平居中

```xml
textStyle：设置字体风格，(normal默认，bold加粗，italic斜体)
gravity：设置空间中内容的对齐方向。

<!-- 内容水平居中对齐代码实现：--> 
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:android="http://schemas.android.com/apk/res/android">
    <TextView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
              
        android:text="Hello World!"
        android:textSize="20dp"
              
    	android:gravity="center_vertical|center_horizontal"
        />
    <requestFocus/>
</LinearLayout>
```



#### 1.1.2、文字阴影

```xml
shadowColor：设置阴影颜色，需要与shadowRadius一起使用。
shadowRadius：设置阴影的模糊程度，设为0.1就变成字体颜色了，建议尽量设置大一点的值，效果更明显。
shadowDx：设置阴影在水平方向的偏移。
shadowDy：设置阴影在垂直方向的偏移。

<!-- 文字阴影的实现： -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="match_parent"

        android:text="Hello World !"
        android:textSize="40dp"

        android:shadowRadius="3"
        android:shadowColor="@color/purple_500"
        android:shadowDx="20"
        android:shadowDy="15"

        android:gravity="center_horizontal|center_vertical"
        />
</LinearLayout>
```



#### 1.1.3、滚动文本(跑马灯)

```xml
singleLine：内容单行显示。
focusable：是否可以获取焦点。
focusableInTouchMode：用于控制视图在触摸模式下是否可以聚焦。
ellipsize：在哪里省略文本。
marqueeRepeatLimit：字母动画重复的次数。
<requestFocus/>：自动获取焦点。

<!-- 跑马灯实现代码： -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout android:layout_width="match_parent"
    android:layout_height="match_parent" xmlns:android="http://schemas.android.com/apk/res/android">

    <TextView
        android:layout_width="200dp"
        android:layout_height="200dp"
        
        android:text="@string/tv_one"
        android:textSize="20dp"

        android:singleLine="true"
        android:ellipsize="marquee"
        android:focusableInTouchMode="true"
        android:marqueeRepeatLimit="marquee_forever"
        />
    <requestFocus/>
</LinearLayout>
```



### 1.2、Button

#### 1.2.1、StateListDrawable

```xml
	StateListDrawable是Drawable资源的一种，可以根据不同的状态，设置不同的图片效果，关键节点<selector>，我们只需要将Button的background属性设置为该drawable资源即可轻松实现，按下按钮时不同的按钮颜色或背景。
        1、drawable：引用的Drawable位图。
        2、state_focused：是否获得焦点。
        3、state_pressed：控件是否被按下。
        4、state_enabled：控件是否可用。
        5、state_selected：控件是否被选择，针对有滚轮的情况。
        6、state_checked：控件是否被勾选。
        7、state_checkable：控件是否能被勾选，eg：checkbox。
        
        8、state_window_focused：是否获得窗口焦点。
        9、state_active：控件是否处于活动状态，eg：slidingTab。
        10、state_single：控件包含多个子控件时，确定是否只显示一个子空间。
        11、state_first：控件包含多个子控件时，确定第一个子控件是否处于显示状态。
        12、state_middle：控件包含多个子控件时，确定中间一个子控件是否处于显示状态。
        13、state_last：控件包含多个子控件时，确定最后一个子控件是否处于显示状态。
        
        14、backgroundTint：改变背景色。
        15、foreground
       
<!-- statelistdrawable.xml -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <Button
        android:layout_width="200dp"
        android:layout_height="100dp"
	
        android:background="@drawable/btn_selector"
       	android:backgroundTint="@color/btn_color_selector"
        />
</LinearLayout>

<!-- btn_selector.xml -->
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/ic_baseline_accessibility_24" android:state_pressed="true"/> 按钮被按下时显示的图片
    <item android:drawable="@drawable/ic_baseline_accessible_24"/> 默认情况下显示的图片
</selector>
        
        1、导入软件自带图片：右击res文件夹-->New-->Vector Asset
        2、在源文件夹drawable下新建xml文件：右击drawable文件夹-->New-->Drawable Resouce File
        3、让背景颜色显示：在源文件夹values中打开themes.xml文件，将parent的属性值更改为：Theme.MaterialComponents.DayNight.DarkActionBar.Bridge
```

#### 1.2.2、Button事件处理

```java
public class MainActivity extends AppCompatActivity {

    private static final String TAG = "led";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.click_event);

        // 获取button控件对象
        Button button = findViewById(R.id.btn_one);

        // 点击事件
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.e(TAG, "onClick：");
            }
        });

        // 长按事件
        button.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View view) {
                Log.e(TAG, "onLongClick：");
                return false;
            }
        });

        // 触摸事件
        button.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                Log.e(TAG, "onTouch："+ motionEvent.getAction());
                return false;
            }
        });
    }
}
/*
	1、当触摸事件返回为true时，将不会执行点击事件与长按事件。
	2、当只有长按事件为true，且长按按钮时，将不会触发单击事件。
	3、当事件的return都为false时，长按按钮将会触发单击事件和长按事件。
		即：
		1、触摸和长按事件返回值都为true时，
			1.1、监听按钮时，长按按钮，则触发顺序为：
				触摸事件-->长按事件-->触摸事件-->单击事件
			1.2、监听按钮时，单击按钮，则触发顺序为：
				触摸事件-->触摸事件-->单击事件
		2、仅触摸事件返回值为true时，
			2.1、监听按钮时，长按按钮，则触发顺序为：
				触摸事件-->触摸事件
			2.2、监听按钮时，单击按钮，则触发顺序为：
				触摸事件-->触摸事件
		3、仅长按事件返回值为true时，
			3.1、监听按钮时，长按按钮，则触发顺序为：
				触摸事件-->长按事件-->触摸事件
			3.2、监听按钮时，单击按钮，则触发顺序为：
				触摸事件-->触摸事件-->单击事件
*/
// 结论：事件的触发始终从触摸事件开始，接着的如果是长按事件，则单击事件会紧跟其后。如果是单击事件，则消息回调。
```



### 1.3、EditText

#### 1.3.1、获取输入框的文本信息

```xml
hint：输入提示。
textColorHint：输入提示文字的颜色。
inputType：输入类型。
drawableXxxx：在输入框的指定方位添加图片。Xxxx：表示有上下左右四个方向。
drawablePadding：设置图片与输入内容的间距。
paddingXxxx：设置内容与边框的间距。Xxxx：表示有上下左右四个方向。
background：背景色。
```

```xml
<!-- xml配置代码 -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">  垂直布局
	<!-- 
 		1、第一个EditText是用户名输入框。
		2、第二个EditText是密码输入框
		3、button按钮点击后触发单击事件，获取到两个输入框的文本数据。
		4、为了方便，文本信息直接写入了，一般文本信息都在strings.xml中写，实现解耦。
	-->
    <EditText
        android:id="@+id/name"  
        android:layout_width="200dp"
        android:layout_height="60dp"
        android:hint="请输入用户名"
        android:paddingLeft="10dp"
        android:drawablePadding="30dp"
        android:inputType="text"
        android:drawableLeft="@drawable/ic_baseline_accessible_24"
        /> 

    <EditText
        android:id="@+id/pwd"
        android:layout_width="200dp"
        android:layout_height="60dp"
        android:hint="请输入密码"
        android:paddingLeft="10dp"
        android:drawablePadding="30dp"
        android:inputType="textPassword"
        android:drawableLeft="@drawable/ic_baseline_accessibility_24"
        />

    <Button
        android:id="@+id/getName"
        android:layout_width="120dp"
        android:layout_height="50dp"
        android:text="提交"
        android:background="@color/purple_500"
        android:textColor="@color/white"
        />
</LinearLayout>
```

```java
// java配置代码
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.edit_text);

        EditText name = findViewById(R.id.name);
        EditText pwd = findViewById(R.id.pwd);
        Button btn = findViewById(R.id.getName);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String nameText = name.getText().toString();
                String pwdText = pwd.getText().toString();
                System.out.println("用户名：" + nameText + "\t密码：" + pwdText);
            }
        });
    }
}
```

### 1.4、ImageView

#### 1.4.1、图片设置

```xml
src：设置图片资源。
scaleType：设置图片缩放类型。
	1、fitStart：保持宽高比缩放图片，直到较长的边与Image的边长相等。缩放完成后将图片放在ImageView的左上角。
	2、fitCenter：默认值，同上。缩放后放于中间。
	3、fitEnd：同上。缩放后放于右下角。

	4、fitXY：对图像的横纵方向进行独立缩放，使得该图片完全适应ImageView，但是图片的宽高比可能会发生改变。

	5、center：保持原图的大小，显示在ImageView的中心。当原图的size大于ImageView的size时，超过的部分会被裁剪掉。
	6、centerCrop：保持宽高比缩放图片，直到完全覆盖ImageView，可能会出现图片的显示不完全。
	7、centerInside：保持宽高比缩放图片，直到ImageView能够完全地显示图片。

	8、matrix：不改变原图的大小，从ImageView的左上角开始绘制原图，原图超过ImageView的部分做裁剪处理。

maxHeight：最大高度。
maxWidth：最大宽度。
adjustViewBounds：调整View的界限。
```



### 1.5、ProgressBar

#### 1.5.1、进度条设置

```xml
常用属性详解
1、max：进度条的最大值。
2、progress：进度条已完成进度值。
3、indeteminate：如果设置成true，则进度条不精确显示进度。
4、style="?android:attr/progressBarStyleHorizontal"：水平进度条
```

#### 1.5.2、演示代码

```xml
<!-- xml配置代码 -->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

<!-- 自动转圈圈的进度条 -->
    <ProgressBar
        android:id="@+id/pb"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:max="100" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="myClick"
        android:text="显示/隐藏进度条" />

<!--  横线的进度条，利用按钮控制进度值  -->
    <ProgressBar
        android:id="@+id/pb1"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:max="1000" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="load"
        android:text="模拟下载" />

<!--  自动横向进度条  -->
    <ProgressBar
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:indeterminate="true"
        android:max="1000" />
</LinearLayout>
```

```java
// java配置代码
public class MainActivity extends AppCompatActivity {

    private ProgressBar pb;
    private ProgressBar pb1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.progress_bar);
        pb = findViewById(R.id.pb);
        pb1 = findViewById(R.id.pb1);
    }

    // 显示或隐藏自动转圈圈的进度条
    public void myClick(View view) {
        // 如果进度条是关闭的就设置打开，反之关闭。
        if (pb.getVisibility() == View.GONE) {
            // visible 看得见的  gone 跑了
            pb.setVisibility(View.VISIBLE);
        } else {
            pb.setVisibility(View.GONE);
        }
    }

    // 按钮控制进度值事件
    public void load(View view) {
        // 获得进度条
        int progress = pb1.getProgress();
        // 进度条值累加
        progress += new Random().nextInt(50)+10;
        // 将值设置进度条上显示出来
        pb1.setProgress(progress);
    }
}
```

### 1.6、Notification

#### 1.6.1、Notification与NotificationManager

1. 创建一个NotificationManager
   - NotificationManager类是一个通知管理类, 这个对象是由系统维护的服务, 是以单例模式的方式获得,所以一般并不直接实例化这个对象, 在Activity中, 可以使用Activity.getSystemService(String)方法获取NotificationManager对象, Activity.getSystemService(String)方法可以通过Android系统级服务的句柄, 返回对应的对象, 在这里需要返回NotificationManager, 所以直接传递Context.NoTIFICATION_SERVICE即可.
2. 使用Builder构造器来创建Notification对象
   - 使用NotificationCompat类的Builder构造器来创建Notification对象, 可以保证程序在所有的版本上都能正常工作. Android8.0新增了通知渠道这个概念, 如果没有设置, 则通知无法在Android8.0的机器上显示.

##### 1.6.2、NotificationManager类

```java
// 通知重要程度设置：
	1、IMPORTANCE_NONE ： 关闭通知。
   	2、IMPORTANCE_MIN：开启通知，不会弹出，但没有提示音，状态栏中无显示。
    3、IMPORTANCE_LOW：开启通知，不会弹出，不发出提示声音，状态栏中显示。
    4、IMPORTANCE_DEFAULT：开启通知，不会弹出，发出提示音，状态栏中显示。
    5、IMPORTANCE_HIGH：开启通知，会弹出，发出提示音，状态栏中显示。
        
// 常见属性设置
	1、setContentTitle(String string)：设置标题。
    2、setContentText(String string)：设置文本内容。
    3、setSmallIcon(int icon)：设置小图标。
    4、setLargeIcon(Bitmap icon)：设置通知的大图标。
    5、setColor(int argb)：设置小图标的颜色。
    6、SetContentIntent(PendingIntent intent)：设置点击通知后的跳转意图。
    7、setAutoCancel(boolean boolean)：设置点击通知后自动清除通知。
    8、setWhen(long when)：设置通知被创建的时间。
```

#### 1.6.3、通知服务

- **xml源码**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="sendNotification"
        android:text="发出通知" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="caseNotification"
        android:text="取消通知" />

</LinearLayout>
```

- **java源码**

```java
public class MainActivity extends AppCompatActivity {

    private NotificationManager manager;
    private NotificationChannel channel;
    private Notification notification;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.notification);

        // 创建一个通知服务
        manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

        // 如果安卓版本在8.0及以上，就创建自定义通知渠道
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            channel = new NotificationChannel("雨落", "测试通知", NotificationManager.IMPORTANCE_HIGH);
            manager.createNotificationChannel(channel);
        }

        // 使用Notification的子类NotificationCompat多态创建通知对象
        notification = new NotificationCompat.Builder(this, "雨落")
                // 设置标题
                .setContentTitle("官方通知")
                // 设置通知内容
                .setContentText("世界那么大，想去走走吗")
                // 设置小图标(5.0以上使用alpha图层绘制图标)
                .setSmallIcon(R.drawable.ic_baseline_accessibility_24)
                // 设置通知文本右边的大图标
                .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.pic_1))
                // 设置小图标颜色
                .setColor(Color.parseColor("#ff0000"))
                .build();

    }

    public void sendNotification(View view) {
        // 事件通知，将设置的notification对象放入通知中，id就相当于标识
        manager.notify(1, notification);
    }

    public void caseNotification(View view) {
        // 通过id来取消通知
        manager.cancel(1);
    }
}
```





## 2、对话框

### 2.1、普通对话框

```java
 // 1、声明对象
AlertDialog dialog;

// 2、绑定当前界面窗口，设置标题
// this表示当前对象，如果对话框在匿名内部类中生成需要使用：当前类.this
dialog = new AlertDialog.Builder(this)  
    	.setTitle("系统消息")
        .setMessage("恭喜你，登录成功！")
        .setIcon(R.mipmap.ic_launcher_round)
        .setPositiveButton("确定", null)
        .setNegativeButton("取消", null)
        .create();

// 3、弹出对话框
dialog.show();
```

效果：

![dialog普通对话框](D:\桌面\Typora\img\Android\普通对话框.jpg)

### 2.2、单选对话框

- **setSingleChoiceItems**
  - 参数一：传入一个数组，用于选择的内容。
  - 参数二：根据数组下标选中，意为默认选项。
  - 参数三：单选对话框的点击事件。

```java
 // 1、创建数组，用于选项框的内容
String[] sex = {"男", "女"};

// 2、声明对象
AlertDialog dialog;

// 3、绑定当前界面窗口
dialog = new AlertDialog.Builder(this)
        .setTitle("请选择性别")  // 设置标题
        .setIcon(R.mipmap.ic_launcher_round) // 设置头像
        .setSingleChoiceItems(sex, 0, new DialogInterface.OnClickListener() { // 绑定监听事件
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                   // dialogInterface.cancel();  // 点击对话框后关闭
                   // dialogInterface.dismiss(); // 选择选项后关闭
                   System.out.println(sex[i]);  // 选择的下标，输出选中的性别
            }
        })
        .setPositiveButton("确定", null)
        .setNegativeButton("取消", null)
        .create();
dialog.show();
```

效果：

<img src="D:\桌面\Typora\img\Android\单选对话框.jpg" alt="单选对话框"  />

### 2.3、多选对话框

- **setMultiChoiceItems**
  - 参数一：传入一个数组，用于选择的内容。
  - 参数二：根据下标，传入一个数组，默认被选中的设置为true。
  - 参数三：监听事件。

```java
String[] hobby = {"游戏", "编程", "乒乓球"};
boolean[] hobbySelect = {false, false, false};

// 创建实例对象
AlertDialog.Builder builder = new AlertDialog.Builder(this);

// 设置配置
builder.setTitle("请选择你的爱好")
        .setMultiChoiceItems(hobby, hobbySelect, new DialogInterface.OnMultiChoiceClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i, boolean b) {
                hobbySelect[i] = b; // 根据下标修改选中状态
            }
        })
        .setPositiveButton("确认", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                String str = "";
                for (int j = 0; j < hobby.length; j++) {
                    if (hobbySelect[j])
                        str += hobby[j] + " ";
                }
                Log.i("雨落", "选择的爱好有：" + str);  // 点击确认后输出被选中的爱好
            }
        })
        .setNegativeButton("取消", null)
        .setNeutralButton("忽略", null)
        .create();
builder.show();
```

效果：

![多选对话框](D:\桌面\Typora\img\Android\多选对话框.jpg)

### 2.4、进度条对话

> ProgressDialog.STYLE_SPINNER = 0  （默认） 圆形进度条对话框
>
> ProgressDialog.STYLE_HORIZONTAL = 1           水平进度条对话框

```java
// 1、创建进度条对话框实例
ProgressDialog proDialog = new ProgressDialog(this);
// 2、设置标题
proDialog.setTitle("进度条对话框");
// 3、设置图片
proDialog.setIcon(R.mipmap.ic_launcher_round);
// 4、设置对话框内容
proDialog.setMessage("正在下载请等待...");

// 5、设置进度条样式
proDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);  // 可以使用0或1
```

![圆形进度条对话框](D:\桌面\Typora\img\Android\圆形进度条.jpg)

![水平进度条对话框](D:\桌面\Typora\img\Android\水平进度条对话框.jpg)



### 2.5、消息对话框

- 参数一：指上下文，即该类对象。若是在内部匿名函数中使用，需使用（类名.this）。
- 参数二：消息对话框的内容。
- 参数三：弹出的时常。LENGTH_LONG = 1;  LENGTH_SHORT = 0;  可以使用0或1代替。

```java
Toast.makeText(this, "消息对话框弹出", Toast.LENGTH_SHORT).show();
```



### 2.6、自定义对话框

太多了，以后再学吧，学不动了。



## 3、Activity组件

### 3.1、概述

- Activity是Android程序中的四大组件之一，为用户提供可视化界面及操作。一个app通常包含多个Activity，每个Activity负责一个用户界面。

### 3.2、生命周期图

![Activity生命周期图](D:\桌面\Typora\img\Android\Activity生命周期图.jpg)

### 3.3、生命周期方法

- onCreate()：在Activity创建时调用。
- onStart()：在Activity即将可见时调用。
- onResume()：在Activity获取焦点开始与用户交互时调用。
- onPause()：在当前Activity被其他Activity覆盖或锁屏时调用。
- onStop()：在Activity对用户不可见时调用。
- onDestroy()：在Activity销毁时调用。
- onRestart()：在Activity从后台再次启动时调用。



### 3.4、Activity的启动模式

1. standard模式：每次启动一个`Activity`都会位于栈顶创建一个实例。先进后出。（不能复用，只会重复创建实例压栈）例：闹钟

```java
该Actitity是否存在 ? 创建新实例 : 创建新实例
```

2. singleTop模式：该模式会判断即将启动的`Activity`实例是否已经位于栈顶，如果在栈顶就直接复用，否则创建新实例。例：浏览器书签

```java
该Actitity是否存在 && 位于栈顶 ? 复用 : 创建新实例 
```

3. singleTask模式：该模式会判断栈中是否存在当前要启动的`Activity`实例，如果存在就将该实例上面的所有实例全部弹出，否则创建新实例。例：浏览器主界面

```java
该Actitity是否存在 ? 弹出该实例上所有实例继而复用 : 创建新实例
```

4. singleinstance模式：如果要启动的`Activity`实例不存在，就创建新任务栈，并创建实例压入。如果存在，将其任务栈转移前台。例：来电显示

```java
该Actitity是否存在 ?  任务栈转移至显示界面 : 创建新任务栈并创建新实例
```



### 3.5、Activity之间的跳转（Intent）
