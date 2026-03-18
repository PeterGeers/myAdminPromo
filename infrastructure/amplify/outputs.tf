# -----------------------------------------------------------------------------
# Outputs — myAdmin Website Amplify Deployment
# -----------------------------------------------------------------------------

output "amplify_app_id" {
  description = "Amplify application ID"
  value       = aws_amplify_app.myadmin_website.id
}

output "amplify_default_domain" {
  description = "Amplify default domain (before custom domain)"
  value       = aws_amplify_app.myadmin_website.default_domain
}

output "amplify_branch_url" {
  description = "URL for the main branch deployment"
  value       = "https://main.${aws_amplify_app.myadmin_website.default_domain}"
}

output "custom_domain_url" {
  description = "Custom domain URL"
  value       = "https://myadmin.jabaki.nl"
}
