output "customer_vm_frontend_1_ip" {
  value = aws_instance.customer_vm_frontend_1.public_ip
}

output "customer_vm_frontend_2_ip" {
  value = aws_instance.customer_vm_frontend_2.public_ip
}

output "customer_vm_backend_1_ip" {
  value = aws_instance.customer_vm_backend_1.public_ip
}

output "customer_vm_backend_2_ip" {
  value = aws_instance.customer_vm_backend_2.public_ip
}

output "admin_vm_frontend_ip" {
  value = aws_instance.admin_vm_frontend.public_ip
}

output "admin_vm_backend_ip" {
  value = aws_instance.admin_vm_backend.public_ip
}

output "db_host" {
  value = aws_db_instance.default.address
}

output "dns_lb" {
  value = aws_lb.customer_lb.dns_name
}
