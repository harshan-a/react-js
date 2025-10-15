import "./ProsSection.css"

export default function ProsSection() {
  const domains = [
    "Development & IT",
    "Design & Creative",
    "AI Service",
    "Sales & Marketing",
    "Writing & Translation",
    "Admin & Support",
    "Finance & Accounting",
    "Legal",
    "HR & Training",
    "Engineering & Architecture",
  ]
  return (
    <div className="pros-section">
      <h4>Explore millions of pros</h4>
      <div className="domain-container">
        {domains.map((domain, i) => {
          return (
            <div className="domain-wrapper" key={i}>
              <div className="domain">
                <img
                  src={`/pros-icon/${domain
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .replace("&", "-")}.svg`}
                />
                <span>{domain}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
