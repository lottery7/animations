#version 420

uniform float WIDTH;
uniform float HEIGHT;
uniform float TIME;

out vec4 frag_color;


const float PI = 3.1415926535;
const float VISIBLE = 0.3;
const float GRAPH_LIM = 0.2;

const float X_SPEED = 7.0;
const float X_FREQ = 5.0;
const float X_OFF = 1.0;

const float Y_SPEED = 5.0;
const float Y_FREQ = 5.0;
const float Y_OFF = 1.0;

bool eq(float a, float b) { return abs(a - b) < 0.002; }

bool eq(float a, float b, float delta) { return abs(a - b) < delta; }

float f_left(float x, float time)
{
    return -GRAPH_LIM * sin(x * X_FREQ * 2.0 * PI + X_SPEED * time - X_OFF);
}

float f_right(float x, float time)
{
    return GRAPH_LIM * sin(x * X_FREQ * 2.0 * PI - X_SPEED * time - X_OFF);
}

float f_top(float y, float time)
{
    return -GRAPH_LIM * sin(y * Y_FREQ * 2.0 * PI - Y_SPEED * time - Y_OFF);
}

float f_bottom(float y, float time)
{
    return GRAPH_LIM * sin(y * Y_FREQ * 2.0 * PI + Y_SPEED * time - Y_OFF);
}

float x_line(float x, float time)
{
    float fx_left = f_left(-VISIBLE, time);
    float fx_right = f_right(VISIBLE, time);
    return (fx_right - fx_left) / (2.0 * VISIBLE) * (x + VISIBLE) + fx_left;
}

float y_line(float y, float time)
{
    float fy_bottom = f_bottom(-VISIBLE, time);
    float fy_top = f_top(VISIBLE, time);
    return (fy_top - fy_bottom) / (2.0 * VISIBLE) * (y - VISIBLE) + fy_top;
}


void main()
{
    vec2 frag_coord = 2.0 * gl_FragCoord.xy / vec2(WIDTH, HEIGHT) - 1.0;
    frag_coord.y *= HEIGHT / WIDTH;

    float x = frag_coord.x;
    float y = frag_coord.y;

    vec4 color = vec4(0);
    if (x > VISIBLE)
    {
        float fx = f_right(x, TIME);
        if (eq(fx, y))
        {
            color = vec4(1);
        }
    }

    if (x < -VISIBLE)
    {
        float fx = f_left(x, TIME);
        if (eq(fx, y))
        {
            color = vec4(1);
        }
    }

    if (y > VISIBLE)
    {
        float fy = f_top(y, TIME);
        if (eq(fy, x))
        {
            color = vec4(1);
        }
    }

    if (y < -VISIBLE)
    {
        float fy = f_bottom(y, TIME);
        if (eq(fy, x))
        {
            color = vec4(1);
        }
    }

    if (abs(x) < VISIBLE && abs(y) < VISIBLE)
    {
        if (eq(x_line(x, TIME), y, 0.001))
        {
            color = vec4(vec3(1), 0.3);
        }

        if (eq(y_line(y, TIME), x, 0.001))
        {
            color = vec4(vec3(1), 0.3);
        }

        for (float t = 0.0; t < 7.0; t += 0.005)
        {   
            if (eq(x_line(x, t), y) && eq(y_line(y, t), x))
            {
                color = vec4(1.0, 0.0, 0.0, 1.0);
                break;
            }
        }

        if (pow(y_line(y, TIME) - x, 2.0) + pow(x_line(x, TIME) - y, 2.0) < 0.0001)
        {
            color = vec4(1);
        }
    }
        

    frag_color = color;
}






