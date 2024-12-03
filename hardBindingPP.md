1. the method used to bind a function is 'bind'

2. if the code was called the code would log JavaScript because the function is bound to obj for context and
 would print the property message in obj. but bind does not call the function it simply returns a new 'bound' function.

3. the first function will return NaN because the bind method return a new funtion. the second funtion will return 5 because it is bound to obj

4. so because you whn a new function is bound to an object using bind it will always be executed in the context it is bound to. the method call will log
JavaScript makes sense! because it is permenantly bound to the object 'positivity'.

5. because bar is permenantly bound to obj it will stay in that context. so we will log amazebulous.