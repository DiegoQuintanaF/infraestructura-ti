output "private_key" {
  value     = tls_private_key.customer_private_key.private_key_pem
  sensitive = true
}

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

output "dns_lb" {
  value = aws_lb.customer_lb.dns_name
}
