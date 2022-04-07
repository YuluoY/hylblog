# SSM框架

## Spring

### maven自动导入依赖

```xml
 <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.3.9</version>
        </dependency>
    </dependencies>
```



### 1、概述（IOC）

- IOC：全称Inversion Of Control，控制反转。
- 理解：对象的实例不再由调用者来创建，而是由Spring容器来创建，Spring容器会负责控制程序之间的关系，而不是由调用者的程序代码直接控制。这样，控制权由应用代码转移到了Spring容器，控制权发生了反转。
- 个人理解：起初，我们要使用一个对象，需要一个个去new，且对象与变量直接绑定，业务需求变更时，要在代码中逐个找到该变量进行修改，耦合度过高。当我们使用了Spring后，对象就不需要我们去管理了，全部放入xml文件中，集中管理，如果需要对象就通过id标识获取即可。

### 2、引导

> 通过下面这个java案例，将对象的管理权交给了用户，我们只需要创建接口。算是IOC雏形。

- dao文件夹

```java
// 创建UserDao接口类
public interface UserDao {
    void getUser();
}

// 创建UserDao实现类
public class UserDaoImpl implements UserDao {
    public void getUser() {
        System.out.println("获取用户默认数据");
    }
}
```
- service文件夹
```java
// 创建UserService接口类
public interface UserService {
    void show();
}

// 创建UserService实现类
public class UserServiceImpl implements UserService {
    private UserDao userDao;

    /*
		【这里是关键的】，我们通过一个set方法，给用户一个接口，这时候只需要使用set方法向属性注入值即可，不必关心是某个具体对象。
    */
    
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
	
	// 使用该方法调用UserDaoImpl的方法，用于展示信息。
    public void show() {
        userDao.getUser();
    }
}
```

- Test.java（测试文件）

```java
public class Test {
    public static void main(String[] args) {
       UserService u = new UserServiceImpl();
       UserServiceImpl uImpl = (UserServiceImpl) u;
       // 这里就是注入的对象，这只是一个点。Spring帮你把关于对象的调控全都做了。你只需注重修改xml文件或者程序，而非对象的调控。
       uImpl.setUserDao( new UserDaoImpl() );
       u.show();
    }
}
```

### 3、依赖注入的方式

#### 3.1、隐式/显示无参构造器注入

> 注：利用无参构造器，使用property注入，需要为每个变量名创建set方法。

1. **value**

```xml
<!-- 这里使用无参构造的属性注入，name就是变量名，value就是值 -->
<bean id="hello" class="com.yuluo.day20211117.demo01_字符串注入.Hello">
        <property name="str" value="Hello Spring!"/>
</bean>
```

2. **ref**

```xml
<!--  1、创建UserDaoImpl实例，对象名为：userDaoImpl  -->
<bean id="userDaoImpl" class="com.yuluo.day20211117.demo02_实现类注入.dao.UserDaoImpl"/>

<!--  2、创建UserServiceImpl实例，将对象userDaoImpl注入到该实例中，即调用set方法注入属性值。  -->
<bean id="userServiceImpl" class="com.yuluo.day20211117.demo02_实现类注入.service.UserServiceImpl">
    <!-- name是要注入的变量名，而ref则是注入的实例 -->
    <property name="userDao" ref="userDaoImpl"/>
</bean>
```

#### 3.2、有参构造器注入

> 一般来说，使用name名称注入就够用了。

**Student.java**

```java
public class Student {
    private String name;
    private Integer age;
    private String sex;

    // 创建有参构造函数
    public Student(String name, Integer age, String sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Student{");
        sb.append("name='").append(name).append('\'');
        sb.append(", age=").append(age);
        sb.append(", sex='").append(sex).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
```

1. **使用name名，即按变量名注入**

```xml
 <!-- 使用name，即按变量名注入 -->
    <bean id="student" class="com.yuluo.day20211117.demo03_有参构造注入.Student">
        <constructor-arg name="name" value="张三"/>
        <constructor-arg name="age" value="20"/>
        <constructor-arg name="sex" value="男"/>
    </bean>
```

2. **按顺序注入**

> 看情况使用，主要注意顺序问题即可。【顺序与构造器中自上而下保持一致。】

```xml
<!--  2、按顺序向有参构造器中注入，看情况使用，主要注意顺序问题 -->
    <bean id="student2" class="com.yuluo.day20211117.demo03_有参构造注入.Student">
        <constructor-arg index="0" value="张三"/>
        <constructor-arg index="1" value="20"/>
        <constructor-arg index="2" value="男"/>
    </bean>
```

3. **按类型注入**

> 不推荐使用，一旦顺序或类型不一致就会出现问题。

```xml
<!-- 3、使用类型注入，不推荐使用，顺序或者类型不一致就出问题了。 -->
    <bean id="student3" class="com.yuluo.day20211117.demo03_有参构造注入.Student">
        <constructor-arg type="java.lang.String" value="张三"/>
        <constructor-arg type="java.lang.String" value="男"/>
    </bean>
```



#### 3.3、测试类

```java
public class Test {
    public static void main(String[] args) {
        // 1、找到xml文件路径，基础路径是resources文件夹下可以直接使用，我这里的完整路径是resources->day2021117->demo01.xml
        String xmlPath = "day20211117/demo01.xml";
        // 2、推荐使用ApplicationContext容器，这里是一种多态的写法。
        // 还有一个BeanFactory容器，但ApplicationContext能在初始化时自检，有利于排查依赖注入问题。
        ApplicationContext context = new ClassPathXmlApplicationContext(xmlPath);
        // 3、获取对象，在context中使用getBean方法通过id名来得到反射的对象，将它强转为我们需要的类。
        Hello hello = (Hello) context.getBean("hello");
        // 4、使用对象
        System.out.println(hello.getStr());
    }
}
```



### 4、基本、引用类型的依赖注入

1. 基本类型

```xml
<bean id="student" class="day20211118.Student">
        <!-- 普通注入，value -->
        <property name="name" value="张三"/>
</bean>
```

2. 引用类型

```xml
<bean id="addr" class="day20211118.Address">
        <property name="address" value="HBUAS"/>
</bean>
<bean id="student" class="day20211118.Student">
        <!-- 引用注入，ref -->
        <property name="address" ref="addr"/>
</bean>
```

3. 数组（Array）注入

```xml
<bean id="student" class="day20211118.Student">
    <!-- 数组注入 -->
    <property name="book">
        <array>
            <value>《教育技术学》</value>
            <value>《中外教育史》</value>
            <value>《教育心理学》</value>
        </array>
    </property>
</bean>
```

4. 列表（list）注入

```xml
<bean id="student" class="day20211118.Student">
	<!-- 列表注入 -->
    <property name="hobby">
        <list>
            <value>写代码</value>
            <value>听歌</value>
            <value>乒乓球</value>
        </list>
    </property>
</bean>
```

5. 映射[字典]（map）注入

```xml
<bean id="student" class="day20211118.Student">
 	<!-- 映射（字典）注入 -->
    <property name="card">
        <map>
            <entry key="校园卡" value="2019108119"/>
            <entry key="农行卡" value="123456789"/>
        </map>
    </property>
</bean>
```

6. 集合（set）注入

```xml
<bean id="student" class="day20211118.Student">
	<!-- 集合注入 -->
    <property name="game">
        <set>
            <value>LOL</value>
            <value>王者荣耀</value>
            <value>QQ飞车</value>
            <value>CF</value>
            <value>DNF</value>
        </set>
    </property>
</bean>
```

7. null值注入

```xml
<bean id="student" class="day20211118.Student">
	<!-- null注入 -->
    <property name="wife">
        <null/>
    </property>
</bean>
```

8. properties注入

```xml
<bean id="student" class="day20211118.Student">
	<!-- properties注入 -->
    <property name="info">
        <props>
            <prop key="学号">2019108119</prop>
            <prop key="性别">男</prop>
            <prop key="地址">银河系地球村</prop>
        </props>
    </property>
</bean>
```



### 5、C & P 命名空间注入

1. C命名空间注入

> 注意（使用前需要导包）：xmlns:c="http://www.springframework.org/schema/c"

```xml
<!-- 使用p命名空间注入，相当于是constructor（语法糖）-->
<bean
    id="user2"
    class="day20211119.c和p命名空间注入.User"
    c:name="李四"
    c:age="18"/>
```

2. P命名空间注入

> 注意（使用前需要导包）：xmlns:p="http://www.springframework.org/schema/p"

```xml
 <!-- 使用p命名空间注入，相当于是property（语法糖）-->
<bean
    id="user"
    class="day20211119.c和p命名空间注入.User"
    p:name="张三"
    p:age="20"/>
```



### 6、Bean作用域

> singleton是默认的，表示：若获取多个同一个对象实例，本质上是指向的同一个。（浅拷贝）
>
> prototype表示：若获取多个同一个对象实例，但每一个都是独立的。（深拷贝）
>
> request、session、application都是在Spring web开发中使用的。

![Bean作用域](D:\桌面\Typora\img\Spring\Bean作用域.jpg)

- 使用

```xml
<bean
    id="user"
    class="day20211119.c和p命名空间注入.User"
    p:name="张三"
    p:age="20"
   	scope="prototype"
/>
```



### 7、Bean的autowire属性自动装配

> byName时，需要保证所有bean的id唯一，并且这个bean需要与自动注入属性set方法的值一致。(变量名)
>
> byType时，需要保证所有的bean的class唯一，并且这个bean需要与自动注入属性的类型一致。(变量类型)
>
> > 可以设置primary属性为true来消除自动装配的不确定性。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!--    <bean id="cat" class="day20211119.autowire自动装配.Cat"/>-->
<!--    <bean id="dog" class="day20211119.autowire自动装配.Dog"/>-->

    <!-- 通过名字进行自动装配，当id名改变时会报错 -->
    <!--    <bean id="person" class="day20211119.autowire自动装配.Person" autowire="byName">-->
    <!--        <property name="name" value="张三"/>-->
    <!--    </bean>-->


    <bean class="day20211119.autowire自动装配.Cat"/>
    <bean class="day20211119.autowire自动装配.Dog"/>

    <!-- 通过类型class进行自动装配 -->
    <bean id="person" class="day20211119.autowire自动装配.Person" autowire="byType">
        <property name="name" value="张三"/>
    </bean>

</beans>
```



### 8、注解自动装配

1. 引入context约束

```xml
 xmlns:context="http://www.springframework.org/schema/context"
```

2. schemaLocation约束添加

```xml
http://www.springframework.org/schema/context
https://www.springframework.org/schema/context/spring-context.xsd
```

3. 开启注解自动装配支持

```xml
 <!-- 开启注解自动装配 -->
<context:annotation-config/>
```

4. 使用注解

> @Autowired通过反射来对变量装配，所以可以不需要set方法

```java
public class Person {
    private String name;
    @Autowired  // 自动装配Cat引用类型
    private Cat cat;
    @Autowired  // 自动装配Dog引用类型
    private Dog dog;
    
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    
    public Cat getCat() {return cat;}
    public Dog getDog() {return dog;}
}
```



#### 8.1、@Autowired的require属性

> 【重点！】：@Autowired是优先类型装配（byType），当有相同类型时，会使用byName装配；当类型与名字都没匹配到时，会报错，可以使用@Qualifier(value = "id名")来指定装配。

>    require为true时(默认为true)，表示：在xml文件中自动装配找不到cat时，将给该变量设置为null。
>    require为false时，					表示：在xml文件中自动装配找不到cat时，将抛出错误。

```java
public class Person {
    private String name;
    
    @Autowired(require = false) 
    private Cat cat;
    
    @Autowired  // 自动装配Dog引用类型
    @Qualifier(value = "dog2") // 指定匹配id为dog2
    private Dog dog;
    
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    
    public Cat getCat() {return cat;}
    public Dog getDog() {return dog;}
}
```

#### 8.2、java的Resource注解

> Resource是优先byName，然后byType，与Spring的Autowired相反。了解即可。

```java
@Resource(name = "dog2")
```

#### 8.3、拓展注解——null

- @NonNull可以标注在方法、字段、参数之上，表示对应的值不可以为空。
- @Nullable注解可以标注在方法、字段、参数之上，表示对应的值可以为空。



### 9、Spring注解开发

> Spring注解开发需要==aop==包与导入==context==约束，来实现。

#### 1、注解开发实现

1. **Application.xml的配置**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 指定要扫描的包，该包下的所有注解都生效 -->
    <context:component-scan base-package="day20211122"/>
    <!-- 注解支持 -->
    <context:annotation-config/>

</beans>
```

2. **User类**

```java
package day20211122.pojo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// 使用该注解将自动为变量配置bean
/*
等效于：<bean id="user" class="day20211122.pojo">
		  <property name="name" value="张三"/>
	   </bean>
*/
@Component  
public class User {
//    public String name = "张三";

    @Value("张三")  // 使用注解赋值
    public String name;
}
```

3. **测试类**

```java
import day20211122.pojo.User;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Day20211122_test01 {
    public static void main(String[] args) {
        String xmlPath = "application.xml";
        ApplicationContext context = new ClassPathXmlApplicationContext(xmlPath);
        User user = context.getBean("user", User.class);
        System.out.println(user.name); // out: 张三
    }
}
```



#### 2、衍生的注解

> `@Component`的三个衍生注解（`@Repository`、`@Service`、`@Controller`），它们的效果都是一样，主要用于语义化区分。在web开发中，会使用MVC三层架构分层。

- dao：该包主要负责数据存储、提取。使用`@Repository`注解。
- service：该包主要负责用户服务设计层。使用`@Service`注解。
- controller：该包主要负责主要逻辑，dao与service之间的操作。使用`@Controller`注解



#### 3、自动装配

> ==detail ---> eighth chapter==

```java
@Autowired：通过类型、名字进行自动装配。
    @Qualifier(value="xx")：用于指定id装配
@Resource：通过名字、类型进行自动装配。
@Nullable：可以使用null。
```



#### 4、作用域注解

> @Scope("prototype")  // 该类作用域为原型。

```java
package day20211122.pojo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// 使用该注解将自动为变量配置bean
/*
等效于：<bean id="user" class="day20211122.pojo">
		  <property name="name" value="张三"/>
	   </bean>
*/
@Component  
@Scope("prototype")  // 该类作用域为原型。
public class User {
//    public String name = "张三";

    @Value("张三")  // 使用注解赋值
    public String name;
}
```



#### 5、小结

- **xml与注解**

  - xml：适用于任何场合，维护方便，对类的集中管理。
  - 注解：只适用于标识了注解的类，维护困难。

- **组合使用**

  - xml：用于管理bean。

  - 注解：负责属性值注入。

  - 在使用过程中，只需要注意一个问题，约束的引入后开启注解支持。

    ```xml
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd"
    
    <!-- 指定要扫描的包，该包下的所有注解都生效 -->
        <context:component-scan base-package="day20211122"/>
        <context:annotation-config/>
    ```



### 10、脱离xml配置

- **使用注解**
  - @Configuration : 使用该注解，可以将xml文件变为java文件，开启纯java编程。
  - @Component
  - @ComponentScan("day20211122")
  - @Import(MyConfig2.class)
  - @Value("张三")

#### 1、MyConfig类

> 该类的配置等效于xml中的配置。
>
> > 在Spring4.0后，官方推荐使用java类来代替xml文件管理。

```java
package day20211122.config;

import day20211122.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration // 使用该注解，此类也会被Spring容器接管，该注解也属于@Component注解
@ComponentScan("day20211122")  // 扫描该包下的注解
@Import(MyConfig2.class) // 将MyConfig2中的配置合并到此类中
public class MyConfig {

    @Bean
    public User user(){
        /*
         * 这里的方法名就是xml中的id名，
         * 而返回的实例就是class引用。
         * */
        return new User();
    }

}
```

#### 2、User类

```java
package day20211122.pojo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component // 该注解说明此类被Spring接管了，注册入了容器中。
public class User {

    private String name;

    public String getName() {
        return name;
    }

    @Value("张三")  // 使用注解注入属性值
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("User{");
        sb.append("name='").append(name).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
```

#### 3、测试类

> 注意这里new的对象是`AnnotationConfigApplicationContext`

```java
import day20211122.config.MyConfig;
import day20211122.pojo.User;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Day20211122_test02 {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(MyConfig.class);
        User user = context.getBean("user", User.class);
        System.out.println(user.getName());  // out：张三
    }
}
```



### 11、代理模式

#### 1、静态代理

> 静态代理：创建一个新的对象，在不更改源码的情况下，既实现原有的功能，也能添加新的功能。
>
> > `UserDao`接口类与`UserDaoImpl`实现类是原有代码。
> >
> > 我们想在用户使用了一个功能后就记录一条日志，便于检查，这时就出现了`UserDaoImplProxy`代理类。
> >
> > >==实现步骤==：
> > >      1、创建代理对象的接口。
> > >      2、实现要代理对象的同一抽象类。
> > >      3、创建代理类。
> > >      4、添加日志功能。

- **UserDao接口类**

```java
public interface UserDao {
    void add();
    void del();
    void modify();
    void query();
}
```

- **UserDaoImpl实现类**

```java
public class UserDaoImpl implements UserDao {
    public void add() {
        System.out.println("添加一条用户信息");
    }

    public void del() {
        System.out.println("删除一条用户信息");
    }

    public void modify() {
        System.out.println("修改一条用户信息");
    }

    public void query() {
        System.out.println("查询一条用户信息");
    }
}
```

- **UserDaoImplProxy代理类**

```java
public class UserDaoImplProxy implements UserDao {
    private UserDaoImpl userDaoImpl;

    public void setUserDaoImpl(UserDaoImpl userDaoImpl) {
        this.userDaoImpl = userDaoImpl;
    }

    public void add() {
        addLog("add");
        userDaoImpl.add();
    }

    public void del() {
        addLog("del");
        userDaoImpl.del();
    }

    public void modify() {
        addLog("modify");
        userDaoImpl.modify();
    }

    public void query() {
        addLog("query");
        userDaoImpl.query();
    }

    public void addLog(String msg) {
        System.out.println("[Debug] 用户使用了" + msg + "功能。");
    }

}
```

- **User用户类**

```java
public class Client {
    public static void main(String[] args) {
        UserDaoImpl user = new UserDaoImpl();
        // user.add();
        /*
        * 添加需求：在用户执行一次操作，就记录下一条日志。（面向切面编程 意为：在不改变源码的情况下添加功能。）
        *   实现步骤：
        *       1、创建代理类。
        *       2、实现要代理对象的同一抽象类。
        *       3、创建代理对象的接口。
        *       4、添加日志功能。
        * */
        UserDaoImplProxy proxy = new UserDaoImplProxy();
        proxy.setUserDaoImpl(user);
        proxy.add();
        proxy.del();
        
        /*
        	输出：
        		[Debug] 用户使用了add功能。
				添加一条用户信息
                [Debug] 用户使用了del功能。
				删除一条用户信息
        */
    }
}

```



#### 2、动态代理

- 动态代理和静态代理角色一样。
- 动态代理的代理类是动态生成的，不是像静态代理那样写死的。
- 动态代理分为两大类：基于接口与基于类的动态代理。
  - 基于接口的动态代理
    - JDK动态代理
  - 基于类的动态代理
    - cglib
  - java字节码实现
    - javasist

> 在实现前，我们需要了解`Proxy`与`InvocationHandle`是什么，如下：
>
> > `Proxy`：提供了用于==创建对象==的静态方法(`newProxyInstance`)，这些对象充当接口实例但允许自定义方法调用
> >
> > `InvocationHandler`：是由代理实例的==调用处理程序==实现的接口。 

- **UserDao**

```java
public interface UserDao {
    void add();
    void del();
    void modify();
    void query();
}
```

- **UserDaoImpl**

```java
public class UserDaoImpl implements UserDao {
    public void add() {
        System.out.println("添加一条用户信息");
    }

    public void del() {
        System.out.println("删除一条用户信息");
    }

    public void modify() {
        System.out.println("修改一条用户信息");
    }

    public void query() {
        System.out.println("查询一条用户信息");
    }
}
```

- **==ProxyInvocationHandler==**【重点！】

  > 步骤：
  >
  > ​	1、创建接口对象。
  >
  > ​	2、创建获取代理对象实例方法。`Proxy.newProxyInstance()` 。 
  >
  > ​			参数一：传入本类的类加载器。
  >
  > ​			参数二：传入类数组，通过`getInterfaces()`方法获取这个实现类的所有接口类。
  >
  > ​			参数三：本类对象。
  >
  > ​	3、创建invoke调用处理程序，当用户使用代理调用接口方法时将执行。

```java
public class ProxyInvocationHandler implements InvocationHandler {

    // 1、创建接口对象
    private Object target;

    public void setTarget(Object target) {
        this.target = target;
    }
    /*
    	按原来的静态代理应该这样写：  
            private UserDao userdao ; 
            public void setUserDao(UserDao userdao) {
                this.userdao = userdao;
            }
        这样就写死了，只能允许UserDao接口类的实现类进入设置。若是要其他的实现类进入设置，就必须得再声明，再设置set方法。
        当我们使用Object时，我们就允许所有接口类的实现类进入了，这样就形成了动态代理。
    */

    // 2、创建获取代理对象方法
    public Object getProxy() {
        return Proxy.newProxyInstance(this.getClass().getClassLoader(),
                target.getClass().getInterfaces(), this);
    }

    // 3、使用InvocationHandler来调用处理程序
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        
        log(method.getName());
        Object result = method.invoke(target, args);
        
        return result;
    }

    public void log(String msg) {
        System.out.println("用户使用了" + msg + "功能");
    }

}
```

- **Client**

  >第1步，就相当于new了一个包租婆A。
  >
  >第2步，就相当于包租婆A找到中介中心。（包租婆A → 中介中心）
  >
  >第3步，就是包租婆A与中介中心签订了contract，将房屋的基本权力转移了。（权力转移，由中介中心接管）
  >
  >第4步，中介中心派出了一个中介人员，去完成包租婆A的需求。（中介中心 派出 中介人员）
  >
  >第5步，就是中介人员完成了一个包租婆的需求。（这里的需求是抽象的概念，可以有无数个，也可以只有一个，也可重复）

```java
public class Client {
    public static void main(String[] args) {
        // 1、创建用户实例
        UserDao user = new UserDaoImpl(); 
        // 2、创建代理调用处理者实例
        ProxyInvocationHandler pih = new ProxyInvocationHandler();
        // 3、调用set方法，注入引用对象。
        pih.setTarget(user);
        // 4、获取代理实例
        UserDao proxy = (UserDao) pih.getProxy();
        // 5、通过代理调用方法
        proxy.del();
    }
}
```



## Spring AOP

### pom.xml

```xml
 <dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.6</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjrt</artifactId>
    <version>1.9.6</version>
</dependency>
<dependency>
    <groupId>aopalliance</groupId>
    <artifactId>aopalliance</artifactId>
    <version>1.0</version>
</dependency>
```

>前置通知：org.springframework.aop.MethodBeforeAdvice;
>
>后置通知：org.springframework.aop.AfterReturningAdvice;
>
>环绕通知：org.aopalliance.intercept.MethodInterceptor;
>
>异常抛出通知：org.springframework.aop.ThrowsAdvice;
>
>引介通知（类中增加新的方法属性）：org.springframework.aop.IntroductionInterceptor;

### 1、概念

- AOP（Aspect Orient Programming）也就是面向切面编程，作为面向对象编程的一种补充，已经成为一种比较成熟的编程方式。其实AOP问世的时间并不太长，AOP和OOP互为补充，面向切面编程将程序运行过程分解成各个切面。

- AOP专门用于处理系统中分布于各个模块（不同方法）中的交叉关注点的问题，在JavaEE应用中，常常通过AOP来处理一些具有横切性质的系统级服务，如事务管理、安全检查、缓存、对象池管理等，AOP已经成为一种非常常用的解决方案。

#### AOP的基本概念

关于面向切面编程的一些术语：

- 横切关注点：跨越应用程序多个模块的方法或功能，即：与我们业务逻辑无关的，但是我们需要关注的部分，就是横切关注点。如：日志、安全、缓存、事务等等。

- 切面（Aspect）: 切面用于组织多个Advice，Advice放在切面中定义。横切关注点被模块化的特殊对象，即：它是一个类。
- 通知（Advice）：切面必须要完成的工作。即：它是类中的一个方法。
- 目标（Target）：被通知对象。
- 代理（Proxy）：向目标对象应用通知之后创建的对象。
- 连接点（Joinpoint）: 程序执行过程中明确的点，如方法的调用，或者异常的抛出。在Spring AOP中，连接点总是方法的调用。
- 增强处理（Advice）: AOP框架在特定的切入点执行的增强处理。处理有"around"、"before"和"after"等类型
- 切入点（Pointcut）: 可以插入增强处理的连接点。简而言之，当某个连接点满足指定要求时，该连接点将被添加增强处理，该连接点也就变成了切入点。

#### 使用AspectJ实现AOP

- **AspectJ**是一个基于Java语言的**AOP框架**，提供了强大的AOP功能，其他很多AOP框架都借鉴或采纳其中的一些思想。其主要包括两个部分：一个部分定义了如何表达、定义AOP编程中的语法规范，通过这套语法规范，可以方便地用AOP来解决Java语言中存在的交叉关注点的问题；另一个部分是工具部分，包括编译、调试工具等。

- AOP实现可分为两类：
  - 静态AOP实现: AOP框架在编译阶段对程序进行修改，即实现对目标类的增强，生成静态的AOP代理类，以AspectJ为代表。
  - 动态AOP实现: AOP框架在运行阶段动态生成AOP代理，以实现对目标对象的增强，以Spring AOP为代表。

> 一般来说，静态AOP实现具有较好的性能，但需要使用特殊的编译器。动态AOP实现是纯Java实现，因此无须特殊的编译器，但是通常性能略差。

#### AOP实现依赖

> 和context自动注入一样也需要在xml文件中引入。
>
> aop是依托aspectj实现，所以需要导入以下依赖。

```xml
<dependencies>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.6</version>
    </dependency>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjrt</artifactId>
        <version>1.9.6</version>
    </dependency>
    <dependency>
        <groupId>aopalliance</groupId>
        <artifactId>aopalliance</artifactId>
        <version>1.0</version>
    </dependency>
</dependencies>
```



### 2、advisor横切点（接口实现）

### dao

#### UserDao接口类

```java
public interface UserDao {
    void add();
    void del();
    void modify();
    void query();
}
```

#### UserDaoImpl实现类

```java
public class UserDaoImpl implements UserDao {
    public void add() {
        System.out.println("用户添加一条信息");
    }

    public void del() {
        System.out.println("用户删除一条信息");
    }

    public void modify() {
        System.out.println("用户修改一条信息");
    }

    public void query() {
        System.out.println("用户查询一条信息");
    }
}
```

### log

#### BeforeLog

```java
import org.springframework.aop.MethodBeforeAdvice;
import java.lang.reflect.Method;
public class BeforeLog implements MethodBeforeAdvice {
    public void before(Method method, Object[] args, Object target) throws Throwable {
        System.out.println(target.getClass().getName() + "的" + method.getName() + "被执行了");
    }
}
```

#### AfterLog

```java
import org.springframework.aop.AfterReturningAdvice;
import java.lang.reflect.Method;
public class AfterLog implements AfterReturningAdvice {
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        System.out.println("执行了" + method.getName() + "方法" + "返回结果为：" + returnValue);
    }
}

```

#### applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:apo="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop
       http://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean id="userDaoImpl" class="day20211126.AOP.dao.UserDaoImpl"/>
    <bean id="beforeLog" class="day20211126.AOP.log.BeforeLog"/>
    <bean id="afterLog" class="day20211126.AOP.log.AfterLog"/>

    <!-- 方法以：使用原生Spring API接口 -->
    <!-- 配置aop，需要导入aop约束 -->
    <apo:config>
        <!-- 切入点：expression：表达式，execution（要执行的位置！* * * * * *） -->
        <apo:pointcut id="pointcut" expression="execution(* day20211126.AOP.dao.UserDaoImpl.*(..))"/>
        <apo:advisor advice-ref="beforeLog" pointcut-ref="pointcut"/>
        <apo:advisor advice-ref="afterLog" pointcut-ref="pointcut"/>
    </apo:config>
</beans>
```

#### 测试类

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class AOP_Test {
    public static void main(String[] args) {
        String xmlPath = "applicationContext.xml";
        ApplicationContext context = new ClassPathXmlApplicationContext(xmlPath);
        // 这里必须向上转型，因为实现切面需要接口类对象。如果使用实现类的话，需要在xml中添加proxy-target-class为true
        UserDao userDao = (UserDao) context.getBean("userDaoImpl");
        userDao.add();
        /*
        	out: 
                day20211126.AOP.dao.UserDaoImpl的add被执行了
                用户添加一条信息
                执行了add方法返回结果为：null
        */
    }
}

```



### 3、aspect切面

#### Diy类

```java
public class Diy {
    public void beforeDiy() {
        System.out.println("============在程序之前执行===========");
    }

    public void afterDiy() {
        System.out.println("============在程序之后执行===========");
    }
}

```

#### applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:apo="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop
       http://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean id="userDaoImpl" class="day20211126.AOP.dao.UserDaoImpl"/>
    <bean id="diy" class="day20211126.AOP.diy.Diy"/>
    
    <apo:config>
        <!-- 自定义切面，ref引用的类 -->
        <apo:aspect ref="diy">
            <!-- 切入点 -->
            <apo:pointcut id="pointcut" expression="execution(* day20211126.AOP.dao.UserDaoImpl.* (..))"/>
            
            <!-- 在切入点之前输出diy中的before方法 -->
            <apo:before method="beforeDiy" pointcut-ref="pointcut"/>
            
            <!-- 在切入点之后输出diy中的before方法 -->
            <apo:after method="afterDiy" pointcut-ref="pointcut"/>
        </apo:aspect>
    </apo:config>

</beans>
```

#### 测试类

> 测试类代码同上



### 4、注解实现

#### 注解类

```java
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class AnnotationPointCut {

    @Before("execution(* day20211208.dao.UserDaoImpl.*(..))")
    public void before() {
        System.out.println("方法前执行=====");
}

    @After("execution(* day20211208.dao.UserDaoImpl.*(..))")
    public void after() {
        System.out.println("方法后执行=====");
    }

    @Around("execution(* day20211208.dao.UserDaoImpl.*(..))")
    public void around(ProceedingJoinPoint pjp) throws Throwable {  // 程序从这个方法开始执行
        System.out.println("环绕前执行====");    // 
        System.out.println(pjp.getSignature());
        Object obj = pjp.proceed(); 
        System.out.println("环绕后执行====");
        
        /*
       	输出结果：
            环绕前执行====
            void day20211208.dao.UserDao.add()
            方法前执行=====
            用户添加一条信息
            方法后执行=====
            环绕后执行====
        */
    }
}

```

#### applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:apo="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop
       http://www.springframework.org/schema/aop/spring-aop.xsd">

    <!-- 开启自动代理支持 -->
    <apo:aspectj-autoproxy/>
    
    <bean id="userDaoImpl" class="day20211208.dao.UserDaoImpl"/>
    <bean id="annotationPointCut" class="day20211208.AnnotationPointCut"/>
```

#### 测试类

> 测试类代码同上





## Spring MVC

### pom.xml 

```xml
 <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.15</version>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>2.5</version>
</dependency>
<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>jsp-api</artifactId>
    <version>2.2</version>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>
```



1. 创建一个maven工程
2. 右击工程包，点击 "Add Framework Support"， 选择 "Web Application" 。使普通工程文件夹变为web工程文件夹。

**传统Java Web**  web.xml 文件的配置

> ​		Java Web配置写好的servlet类，给它起别名进行地址映射。在浏览器访问`localhost:8080/hello`时，`HelloServlet`类将对请求进行处理并返回相应的`jsp`页面。
>
> ​		理想的状态是希望一个servlet类管理一个jsp页面。但传统的配置以及servlet的管理有一个弊端，当页面越来越多时，servlet类也等比例增加。

```xml
<servlet>
    <servlet-name>hello</servlet-name>
    <servlet-class>com.hyl.service.HelloServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>hello</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>


// 请求超时时间  
<session-config>
    <session-timeout>15</session-timeout>
</session-config>
```

### Spring MVC的 `web.xml`文件配置

> ​		Spring MVC解决了传统的servlet管理的痛点，当然这只是其中之一。
>
> ​		Spring MVC写了一个`DispatcherServlet`类，用于对servlet管控，当请求某个页面时，都会被它拦截，然后给到`springmvc-servlet.xml`中处理。

```xml
<!--  注册DispatcherServlet，它是请求分发器，存在与用户与servlet之间进行调度  -->
<servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--  关联一个springmvc的配置文件   -->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:springmvc-servlet.xml</param-value>
    </init-param>
    <!--  启动级别   -->
    <load-on-startup>1</load-on-startup>
</servlet>

<!--  前端控制器 相当于路由 / 表示所有本地请求都可被通过 -->
<!--
    /:   匹配所有请求，不会去匹配jsp页面
    /* : 匹配所有请求，包括jsp页面
 -->
<servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

#### **resources文件夹**

>该文件下的`springmvc-servlet.xml`, 就是对请求的一系列处理。
>
>1. 处理器映射器是第一步，请求经过`DispatcherServlet` --> `HandlerMapping` --> `HandlerExecution` --> `DispatcherServlet`。
>2. 处理器适配器是第二部，请求经过`DispatcherServlet` --> `HandlerAdapter` --> `Controller` --> `HandlerAdapter` --> `DispatcherServlet`
>3. 视图解析器是第三步，以下配置将会给请求的地址分别添加前缀 `/WEB-INF/jsp/` 和后缀 `.jsp` 。比如：请求的是`localhost:8080/hello` 将变为 `localhost:8080/WEB-INF/jsp/hello.jsp`
>4. 最后一个bean实例是请求访问`/hello`时，将会被转到`HelloController`类，进行处理。

```xml
<!--  处理器映射器  -->
<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
<!--  处理器适配器  -->
<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>

<!--  视图解析器：DispatcherServlet给他的ModeAndView  -->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
    <!--  前缀  -->
    <property name="prefix" value="/WEB-INF/jsp/"/>
    <!--  后缀  -->
    <property name="suffix" value=".jsp"/>
</bean>

<bean id="/hello" class="com.hyl.controller.HelloController"/>
```

#### Controller文件夹

> `HelloController`类将实现`Controller`类中的`handleRequest`方法，并返回一个ModelAndView实例。

```java
package com.hyl.controller;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HelloController implements Controller {
    public ModelAndView handleRequest(HttpServletRequest req, HttpServletResponse res) throws Exception {
        // ModelAndView 模型和视图
        ModelAndView mv = new ModelAndView();

        // 封装对象，放在ModelAndView中
        req.setCharacterEncoding("utf-8");
        mv.addObject("username", req.getParameter("username"));
        mv.addObject("password", req.getParameter("password"));

        // 封装要跳转的视图
        mv.setViewName("test");  //  实际路径： /WEB-INF/jsp/test.jsp
        return mv;
    }
}
```



### Spring MVC注解开发

#### web.xml

```xml
<servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>

        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!--  配置解决乱码的过滤器  -->
    <filter>
        <filter-name>encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encoding</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```



#### springmvc-servlet.xml

```xml
 <!--  自动扫描包  -->
    <context:component-scan base-package="com.hyl.controller"/>
  
	<!-- 让SpringMVC有处理静态资源的能力， tomcat的defaultServlet -->
    <mvc:default-servlet-handler/>

	<!-- 注解驱动 -->
    <mvc:annotation-driven/>

    <!--  视图解析器  -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
```



#### controller

```java
@Controller  // 使用@Controller注解，该类被SpringMVC托管，且通过扫描自动配置的bean实例。
//@RequestMapping("/chapter")  // 当一个类使用了请求映射后，其类中的方法都为二级路由。即：localhost:8080/chapter/hello
public class HelloController {

    @RequestMapping("/hello")  // 映射/hello路径，任何请求都将通过
//    @GetMapping  // 专门用于映射get请求，还有类似的post、put、delete...
    public String hello(Model model) {
        // 封装数据
        model.addAttribute("msg", "Hello, 胡永乐大聪明");

        return "hello"; // 会被视图解析器处理（要跳转的页面，它会被视图解析器进行添加前后缀）
    }
    
    
    // RestFul风格  http://localhost:8080/add/2/3
    @RequestMapping(value = "/add/{x}/{y}", method = RequestMethod.DELETE)  // 限定delete请求通过该路由
//    @GetMapping("/add/{x}/{y}")  // get请求映射
//    @DeleteMapping("/add/{x}/{y}")  // delete请求映射
    public String hello2(@PathVariable int x, @PathVariable int y, Model model) {
        model.addAttribute("msg", "x+y的结果为：" + (x + y));
        return "hello";
    }
```





## Mybatis

### pom.xml

> mybatis依赖，mysql驱动，junit测试
>
> 虽然导入时是mybatis的依赖包，在使用的时候还是以apache的ibatis命名，详情👉[Mybatis](https://baike.baidu.com/item/MyBatis/2824918?fr=aladdin)。
>
> resources标签中，用于在生成target文件时也将把src/main/java包中的所有带有.xml后缀的文件也进行打包。否则将报错`java.lang.ExceptionInInitializerError`。

```xml
<dependencies>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.4.5</version>
    </dependency>

    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.25</version>
    </dependency>

    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
<!--   资源插件：处理src/main/java目录中的xml     -->
<resources>
    <resource>
        <directory>src/main/java</directory>
        <includes>
            <include>**/*.properties</include>
            <include>**/*.xml</include>
        </includes>
        <filtering>false</filtering>
    </resource>
</resources>
</build>
```



### Mybatis dao代理以及CRUD的实现

​	mybatis创建Dao接口的实现类对象，完成sql语句的执行。mybatis创建一个对象代替你的dao实现类功能。

mybatis代理的约定：

1. mapper文件中的`namespace`一定是dao接口的全限定名称。
2. mapper文件中标签的id是dao接口方法名称。

#### **mybatis-config.xml**

> 该文件为mybatis的核心配置，对传统的JDBC进行了更好的优化封装。这里连接的是MySQL中的名为mybatis数据库
>
> 注意：mappers标签需要指定你的mapper文件位置，否则将报错`org.apache.ibatis.binding.BindingException: Type interface com.hyl.dao.UserMapper is not known to the MapperRegistry.`
>
> ​	&amp ：这是在xml文件中使用&符号连接属性的写法。
>
> ​	serverTimezone=GMT ：设置服务器时区。
>
> ​	useSSL=true ：开启[SSL](https://baike.baidu.com/item/ssl)安全数据传输。
>
> ​	useUnicode=true ：使用unicode编码。
>
> ​	characterEncoding=UTF-8 ：使用utf-8字符集，防止数据乱码。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!-- configuration核心配置文件 -->
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis?
                    serverTimezone=GMT&amp; 
                    useSSL=true&amp;
                    useUnicode=true&amp;
                    characterEncoding=UTF-8"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="com/hyl/dao/UserMapper.xml"/> 
    </mappers>
</configuration>
```

#### utils工具类

> 该类将通过getSqlSession方法返回一个建立好的sql会话实例。

```java
public class MybatisUtils {

    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            // 这里三行是官方的给的写法，意为创建sql工厂
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static SqlSession getSqlSession() {
        return sqlSessionFactory.openSession();
    }
}
```

#### UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!-- 这里的命名空间需指定到一个接口，接口中的方法与下面的标签一一对应，实现CRUD -->
<mapper namespace="com.hyl.dao.UserMapper">
    <!-- 以下的id都与UserMapper接口中未实现的方法一一对应 -->
    
    <!-- 查询数据表中的所有数据，返回类型为User实例 -->
    <select id="getUserList" resultType="com.hyl.pojo.User">
        select * from mybatis.user
    </select>

    <!-- 查询数据表中指定id的数据，返回类型为User实例 -->
    <select id="selectUserById" parameterType="int" resultType="com.hyl.pojo.User">
        select * from mybatis.user where id = #{id}
    </select>

    <!-- 插入一条参数类型为User的数据 -->
    <insert id="addUser" parameterType="com.hyl.pojo.User">
       insert into mybatis.user (id, name, password) values (#{id}, #{name}, #{password});
    </insert>

    <!-- 更新一条参数类型为User的数据，用id进行信息行匹配 -->
    <update id="updateUser" parameterType="com.hyl.pojo.User">
        UPDATE mybatis.user SET name=#{name},password=#{password} WHERE id=#{id}
    </update>

    <!-- 删除一条数据，参数类型为int，通过id进行匹配数据行 -->
    <delete id="deleteUser" parameterType="int">
        DELETE FROM mybatis.user WHERE id=#{id}
    </delete>
</mapper>
```

#### UserMapper接口

```java
public interface UserMapper {
    List<User> getUserList();
    User selectUserById(Integer id);
    int addUser(User user);
    int updateUser(User user);
    int deleteUser(int id);
}
```

#### User类

> 需要注意的是，该类中的变量名需要与sql表中的字段名相对应。

```java
public class User {
    private Integer id;
    private String name;
    private String password;
    
    // ......自行补充getter/setter方法，重写toString方法，添加无参/有参构造器
}
```

#### UserMapperTest测试类

> 在进行添加、更新、删除操作需要提交事务，即：`sqlSession.commit()`

```java
public class UserMapperTest {
    
    // 读取Mybatis数据库中的user表中的所有数据
    @Test
    public void test() {
        // 第一步，获取sqlSession对象
        SqlSession sqlSession = MybatisUtils.getSqlSession();

        try {
            // 执行sql
            UserMapper userDao = sqlSession.getMapper(UserMapper.class);
            List<User> userList = userDao.getUserList();
            for (User user : userList) {
                System.out.println(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
    }
    
    // 通过id来查找数据
    @Test
    public void getUserById() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User user = mapper.selectUserById(1);
        System.out.println(user);
        sqlSession.close();
    }

    // 添加用户数据 【插入用户数据】
    @Test
    public void addUser() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int result = mapper.addUser(new User(4, "刘六", "111222"));
        if (result > 0) {
            System.out.println("添加用户数据成功！");
        }
        sqlSession.commit();
        sqlSession.close();
    }

    // 更新表中的数据
    @Test
    public void updateUser() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int result = mapper.updateUser(new User(1, "田昭迪", "121212"));
        if (result > 0) {
            System.out.println("用户数据更新成功！");
        }
        sqlSession.commit();
        sqlSession.close();
    }

    // 删除表中的数据
    @Test
    public void deleteUser() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int result = mapper.deleteUser(1);
        if (result > 0) {
            System.out.println("已删除一条用户数据！");
        }
        sqlSession.commit();
        sqlSession.close();
    }

}
```



### #和$的区别

#### #占位符

>  mybatis处理#{}使用jdbc对象是PrepareStatment对象

```xml
<select id="selectById" parameterType="integer"
        resultType="com.hyl.pojo.User">
	select * from user where id=#{id}
</select>

mybatis创建PrepareStatement对象，执行sql语句。
String sql = "select * from user where id=?";
PrepareStatement pst = conn.prepareStatement(sql);
<!-- 
	传递参数 
	如果参数是字符串就是 pst.setString(1,"张三");
-->
pst.setInt(1,1001); 
ResultSet rs = pst.executeQuery(); <!-- 执行sql语句 -->
```

**#{}的特点：**

1. 使用PrepareStatement对象，执行sql语句，效率高。
2. 使用的PrepareStatement对象，能避免sql语句注入，更安全。
3. #{}常常作为列值来使用的，位于等号的右侧，#{}位置的值和数据类型有关的。





#### $占位符

```xml
<select id="selectById" parameterType="integer"
        resultType="com.hyl.pojo.User">
	select * from user where id=${id}
</select>

${}表示字符串连接，把sql语句的其他内容和${}内容使用字符串(+)进行连接。
String sql = "select * from user where id=" + "1001";

mybatis创建Statement对象，执行sql语句。
Statement stmt = conn.createStatement(sql);
ResultSet rs = stmt.executeQuery();
```

**${}的特点**

1. 使用Statement对象，执行sql语句效率低。
2. ${}占位符的值，使用字符串连接方式，有sql注入的风险。
3. ${}数据是原样使用的，不会区分数据类型。
4. ${}常作表名或者列名，在能保证数据安全的情况下使用${}。





### 动态SQL

**什么是动态sql**：同一个dao的方法，根据不同的条件可以表示不同的sql语句，主要是where部分有变化，使用mybatis提供的标签，实现动态sql的能力，主要讲`if`，`where`，`foreach`, `sql`。

使用动态sql的时候，dao方法的形参使用java对象。

#### if标签

```xml
语法：
<if test="boolean判断结果">
	<!-- sql代码 -->
</if>

<select id="selectStudent">
 	select * from student
    where id=-1
    <if test="条件">
    	or name = #{name}
    </if>
    <if test="条件">
    	or age = #{age}
    </if>
</select>
```



#### where标签

使用if标签时，容易引起sql语句语法错误，使用where标签解决if产生的语法问题。

使用时where，里面是一个或多个if标签，当有一个if标签判断条件为true，where标签会转为WHERE关键字附加到sql语句的后面。如果if没有一个条件为true，则忽略where和if标签。

```xml
语法：
<where>
	<if test="条件1">sql语句1</if>
    <if test="条件2">sql语句2</if>
</where>
```



#### foreach循环

使用foreach可以循环数组、list集合，一般使用在in语句中。

```xml
语法：
<foreach collection="集合类型"
      open="开始的字符"
      close="结束的字符"
      item="集合中的成员"
      separator="集合成员之间的分隔符">
    
    #{ item的值 }
    
</foreach>

collection：表示循环的对象是数组还是list集合。如果dao接口方法的形参是数组，collection="array"，如果dao接口形参是List，collection="list"

open：循环开始时需要添加的字符。
close：循环结束时需要添加的字符。
item：集合成员，自定义的变量。
separator：集合成员循环之间添加的分隔符。


<select id="selectAuto" resultType="Student">

    select * from student
    <if test="list != null and list.size>0">
    	where id in
       <foreach collection="list"
             open="("
             close=")"
             separator=","
             item="myId">
        #{myId}
       </foreach>
    </if>

</select>
```



#### sql标签（代码片段）

sql标签表示一段sql代码，可以是表名，几个字段，where条件都可以，可以在其他地方复用sql标签的内容。

使用方式：

1. 在mapper文件中定义sql代码片段`<sql id="唯一字符串">部分sql语句</sql>`
2. 在其他的位置，使用`include`标签引用某个代码片段。
3. 引用：`<include refid="唯一字符串"/>`
