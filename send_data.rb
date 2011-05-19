file = File.new("ip_time.txt", "r")
url = "ec2-46-51-164-69.eu-west-1.compute.amazonaws.com:8080/data"
url = "localhost:8080/data"
while (line = file.gets)
  bits = line.split(" ");
  puts "curl #{url}?ip=#{bits[0]}"
  `curl #{url}?ip=#{bits[0]}`  
  
end

file.close