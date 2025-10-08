function fibonacci(n)
    local seq = {0, 1}
    for i = 3, n do
        seq[i] = seq[i-1] + seq[i-2]
    end
    return seq
end

local fib10 = fibonacci(10)
for i, v in ipairs(fib10) do
    print(i, v)
end

-- ecsdi
